"use client";
import { useState, useCallback } from "react";

type TweakValues = Record<string, unknown>;

export function useTweaks<T extends TweakValues>(defaults: T) {
  const [values, setValues] = useState<T>(defaults);

  const setTweak = useCallback(
    (keyOrEdits: string | Partial<T>, val?: unknown) => {
      const edits =
        typeof keyOrEdits === "object" && keyOrEdits !== null
          ? keyOrEdits
          : { [keyOrEdits]: val };
      setValues((prev) => ({ ...prev, ...edits }));
      if (typeof window !== "undefined") {
        window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*");
        window.dispatchEvent(
          new CustomEvent("tweakchange", { detail: edits })
        );
      }
    },
    []
  );

  return [values, setTweak] as const;
}
