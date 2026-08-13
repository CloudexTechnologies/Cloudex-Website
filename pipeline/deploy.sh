#!/usr/bin/env bash
# Sync the pipeline to the OVH VPS and install the Hermes cron wrappers.
#
#   ./pipeline/deploy.sh            sync code only
#   ./pipeline/deploy.sh --cron     sync, then (re)create the scheduled jobs
#
# The .env file on the server is never overwritten — it holds the Sanity token.

set -euo pipefail

VPS_HOST="${VPS_HOST:-ubuntu@135.125.233.21}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/id_ed25519}"
REMOTE_DIR="/home/ubuntu/cloudex-content"
HERMES_SCRIPTS="/home/ubuntu/.hermes/scripts"
HERMES_PY="/home/ubuntu/.hermes/hermes-agent/venv/bin/python"
HERMES="$HERMES_PY -m hermes_cli.main"
NOTIFY_TARGET="${NOTIFY_TARGET:-whatsapp:50264253931680@lid}"

SOURCE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SSH=(ssh -i "$SSH_KEY" -o StrictHostKeyChecking=accept-new "$VPS_HOST")

echo "→ syncing $SOURCE_DIR to $VPS_HOST:$REMOTE_DIR"
"${SSH[@]}" "mkdir -p $REMOTE_DIR $HERMES_SCRIPTS"

rsync -az --delete \
  --exclude '.env' \
  --exclude 'logs/' \
  --exclude 'work/' \
  --exclude 'state/' \
  --exclude '__pycache__/' \
  --exclude '*.pyc' \
  -e "ssh -i $SSH_KEY -o StrictHostKeyChecking=accept-new" \
  "$SOURCE_DIR/" "$VPS_HOST:$REMOTE_DIR/"

"${SSH[@]}" "chmod +x $REMOTE_DIR/bin/*.py"

# Hermes only runs scripts that live under ~/.hermes/scripts, so these thin
# wrappers are what the scheduler actually invokes.
echo "→ installing cron wrappers"
"${SSH[@]}" "cat > $HERMES_SCRIPTS/cloudex_research_scan.sh" <<WRAPPER
#!/usr/bin/env bash
# Daily topic discovery for the Cloudex insights pipeline.
# Silent on an uneventful run; stdout is delivered verbatim to the owner.
set -uo pipefail
cd $REMOTE_DIR
exec /usr/bin/python3 bin/research_scan.py 2>>logs/research.log
WRAPPER

"${SSH[@]}" "cat > $HERMES_SCRIPTS/cloudex_publish.sh" <<WRAPPER
#!/usr/bin/env bash
# Writes, reviews and publishes one article. Always reports to the owner.
set -uo pipefail
cd $REMOTE_DIR
exec /usr/bin/python3 bin/write_and_publish.py 2>>logs/publish.log
WRAPPER

"${SSH[@]}" "chmod +x $HERMES_SCRIPTS/cloudex_research_scan.sh $HERMES_SCRIPTS/cloudex_publish.sh"
"${SSH[@]}" "mkdir -p $REMOTE_DIR/logs $REMOTE_DIR/work $REMOTE_DIR/state"

"${SSH[@]}" "test -f $REMOTE_DIR/.env" \
  && echo "→ .env present on server (left untouched)" \
  || echo "⚠  no .env on server yet — copy .env.example to $REMOTE_DIR/.env and add SANITY_WRITE_TOKEN"

if [[ "${1:-}" == "--cron" ]]; then
  echo "→ (re)creating scheduled jobs"
  "${SSH[@]}" "HERMES_HOME=/home/ubuntu/.hermes $HERMES cron remove cloudex-research-scan 2>/dev/null; true"
  "${SSH[@]}" "HERMES_HOME=/home/ubuntu/.hermes $HERMES cron remove cloudex-publish 2>/dev/null; true"

  # Daily at 06:30 UTC — after the US-evening research drops, before the writer runs.
  "${SSH[@]}" "HERMES_HOME=/home/ubuntu/.hermes $HERMES cron create '30 6 * * *' \
    --name cloudex-research-scan \
    --script cloudex_research_scan.sh --no-agent \
    --deliver '$NOTIFY_TARGET'"

  # Tuesday and Thursday at 09:00 UTC.
  "${SSH[@]}" "HERMES_HOME=/home/ubuntu/.hermes $HERMES cron create '0 9 * * 2,4' \
    --name cloudex-publish \
    --script cloudex_publish.sh --no-agent \
    --deliver '$NOTIFY_TARGET'"

  "${SSH[@]}" "HERMES_HOME=/home/ubuntu/.hermes $HERMES cron list"
fi

echo "✓ done"
