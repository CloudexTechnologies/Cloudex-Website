#!/usr/bin/env python3
"""
Report basic tonal statistics for a rendered image.

Run as a script under an interpreter that has Pillow (the Hermes venv does; the
system Python does not), and it prints JSON to stdout:

    <hermes-venv-python> lib/imagecheck.py /path/to/hero.png

This exists because the first generation the pipeline ever produced was five
hairline rectangles on a black field — technically a valid PNG, useless as a
thumbnail. Mean luminance and spread catch that class of failure cheaply.
"""

from __future__ import annotations

import json
import sys


def stats(path: str) -> dict:
    from PIL import Image  # imported lazily so the error message stays useful

    with Image.open(path) as source:
        image = source.convert("L")
        width, height = image.size
        # Downsample first: full-resolution statistics cost time and tell us
        # nothing extra about overall tone.
        image = image.resize((160, 90))
        pixels = list(image.getdata())

    count = len(pixels)
    mean = sum(pixels) / count
    variance = sum((value - mean) ** 2 for value in pixels) / count
    spread = variance ** 0.5

    near_black = sum(1 for value in pixels if value < 24) / count
    bright = sum(1 for value in pixels if value > 170) / count

    return {
        "width": width,
        "height": height,
        "meanLuminance": round(mean, 2),
        "spread": round(spread, 2),
        "nearBlackShare": round(near_black, 4),
        "brightShare": round(bright, 4),
    }


def verdict(measured: dict) -> tuple[bool, str]:
    """
    Thresholds are tuned for a deliberately dark brand palette — the image is
    meant to be moody, so the test is for an *empty* frame, not a dark one.
    """
    if measured["nearBlackShare"] > 0.80:
        return False, (
            f"{measured['nearBlackShare']:.0%} of the frame is near-black — "
            "the subject is missing or far too small"
        )
    if measured["spread"] < 18:
        return False, (
            f"tonal spread is {measured['spread']:.0f} — the frame is nearly flat, "
            "with no lighting or depth"
        )
    if measured["brightShare"] < 0.005:
        return False, "no bright highlight anywhere — the image has no focal point"
    if measured["meanLuminance"] < 12:
        return False, f"mean luminance {measured['meanLuminance']:.0f} is too dark to read as a thumbnail"
    return True, "usable"


def main() -> int:
    if len(sys.argv) != 2:
        print(json.dumps({"error": "usage: imagecheck.py <image-path>"}))
        return 2
    try:
        measured = stats(sys.argv[1])
    except Exception as error:  # noqa: BLE001
        print(json.dumps({"error": f"{type(error).__name__}: {error}"}))
        return 1

    ok, reason = verdict(measured)
    measured["ok"] = ok
    measured["reason"] = reason
    print(json.dumps(measured))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
