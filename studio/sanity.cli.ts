import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'so1isjsl',
    dataset: 'production',
  },
  studioHost: 'cloudextechnologies',
  // Auto-updates let the hosted Studio pick up Sanity bugfixes without a redeploy.
  // The build resolves the module version from sanity-cdn.com, so this needs
  // network access at deploy time.
  // appId is pinned so redeploys target the same hosted Studio without prompting.
  deployment: { autoUpdates: true, appId: 'f21j9064b2b7cce6j93x1ua7' },
})
