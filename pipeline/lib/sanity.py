"""Thin Sanity HTTP client. Stdlib only — the VPS has no project virtualenv."""

from __future__ import annotations

import json
import mimetypes
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

from . import settings

API_HOST = f"https://{settings.SANITY_PROJECT_ID}.api.sanity.io"
_BASE = f"{API_HOST}/v{settings.SANITY_API_VERSION}"


class SanityError(RuntimeError):
    pass


def _request(
    url: str,
    *,
    method: str = "GET",
    body: bytes | None = None,
    content_type: str | None = None,
    retries: int = 3,
) -> dict[str, Any]:
    headers = {"Authorization": f"Bearer {settings.sanity_token()}"}
    if content_type:
        headers["Content-Type"] = content_type

    last_error: Exception | None = None
    for attempt in range(retries):
        request = urllib.request.Request(url, data=body, headers=headers, method=method)
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as error:
            detail = error.read().decode("utf-8", "replace")[:800]
            # 4xx other than 429 will not fix themselves; fail fast.
            if error.code < 500 and error.code != 429:
                raise SanityError(f"{method} {url} -> {error.code}: {detail}") from error
            last_error = SanityError(f"{method} {url} -> {error.code}: {detail}")
        except (urllib.error.URLError, TimeoutError) as error:
            last_error = SanityError(f"{method} {url} -> {error}")

        if attempt < retries - 1:
            time.sleep(2 ** attempt)

    raise last_error or SanityError(f"{method} {url} failed")


def query(groq: str, params: dict[str, Any] | None = None) -> Any:
    """Run a GROQ query. Params are JSON-encoded per Sanity's $param convention."""
    encoded: dict[str, str] = {"query": groq}
    for key, value in (params or {}).items():
        encoded[f"${key}"] = json.dumps(value)

    url = f"{_BASE}/data/query/{settings.SANITY_DATASET}?{urllib.parse.urlencode(encoded)}"

    # Long queries exceed sensible URL limits; POST carries them in the body instead.
    if len(url) > 6000:
        payload = json.dumps({"query": groq, "params": params or {}}).encode("utf-8")
        result = _request(
            f"{_BASE}/data/query/{settings.SANITY_DATASET}",
            method="POST",
            body=payload,
            content_type="application/json",
        )
    else:
        result = _request(url)

    return result.get("result")


def mutate(
    mutations: list[dict[str, Any]],
    *,
    return_ids: bool = False,
    return_documents: bool = False,
) -> dict[str, Any]:
    url = f"{_BASE}/data/mutate/{settings.SANITY_DATASET}"
    flags = []
    if return_ids:
        flags.append("returnIds=true")
    if return_documents:
        flags.append("returnDocuments=true")
    if flags:
        url += "?" + "&".join(flags)
    payload = json.dumps({"mutations": mutations}).encode("utf-8")
    return _request(url, method="POST", body=payload, content_type="application/json")


def create(document: dict[str, Any]) -> str:
    """Create a document and return its generated _id."""
    # Without returnIds the API answers with the operation name only.
    result = mutate([{"create": document}], return_ids=True)
    return result["results"][0]["id"]


def create_or_replace(document: dict[str, Any]) -> str:
    result = mutate([{"createOrReplace": document}], return_ids=True)
    return result["results"][0]["id"]


def patch(document_id: str, set_fields: dict[str, Any] | None = None, *, inc: dict[str, int] | None = None) -> None:
    operations: dict[str, Any] = {"id": document_id}
    if set_fields:
        operations["set"] = set_fields
    if inc:
        operations["inc"] = inc
    mutate([{"patch": operations}])


def upload_image(path: Path, *, filename: str | None = None) -> dict[str, Any]:
    """Upload a local image and return the asset document (its `_id` is the ref)."""
    content_type = mimetypes.guess_type(path.name)[0] or "image/png"
    params = urllib.parse.urlencode({"filename": filename or path.name})
    url = f"{_BASE}/assets/images/{settings.SANITY_DATASET}?{params}"
    result = _request(
        url,
        method="POST",
        body=path.read_bytes(),
        content_type=content_type,
        retries=2,
    )
    return result["document"]


def image_field(asset_id: str, alt: str, *, generation_prompt: str | None = None) -> dict[str, Any]:
    field: dict[str, Any] = {
        "_type": "image",
        "asset": {"_type": "reference", "_ref": asset_id},
        "alt": alt,
    }
    if generation_prompt:
        field["generationPrompt"] = generation_prompt
    return field


def slug_exists(slug: str) -> bool:
    return bool(query('count(*[_type == "post" && slug.current == $slug]) > 0', {"slug": slug}))
