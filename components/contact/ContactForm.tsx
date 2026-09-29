"use client";

/**
 * ContactForm — the `/contact` "Form Container" form and its 5-state submit button.
 *
 * ── Sources ──────────────────────────────────────────────────────────────────────────
 * Markup      `_source/live/contact.html` 158989–172243 (`section.framer-8l81tn` → the
 *             `div.framer-1xbzyr1` "Form Container" child), cross-checked against
 *             `_source/rendered/contact.{desktop,tablet,phone}.html` — all three are
 *             BYTE-IDENTICAL, so there are no breakpoint variants to preserve here
 *             (PLAN.md §1.1 / contact.md "Breakpoint variants: none").
 * Behaviour   `_source/behaviours/contact-form.md` (MEASURED), plus the two source-mapped
 *             modules it cites, both recovered from
 *             `_source/behaviours/chunks/maps/4xShclhSYutMctctyCZjlZAJd-…mjs.map`:
 *               • `czQha9DIH.js`  — the page module: the `FormContainer` action, the five
 *                 `FormPlainTextInput` calls, and the `formVariants` state→variant mapper.
 *               • `tHtqDFzFd.js`  — `displayName = "Form Button"`: every variant's class
 *                 name, label, colour and transition, and the inline spinner.
 *             …and Framer's own `FormContainer` implementation, read out of
 *             `_source/behaviours/chunks/maps/framer.CkPAC0_e.mjs.map`
 *             (`library/src/render/presentation/Forms/FormContainer.tsx`), which is what
 *             actually decides `incomplete` vs `complete`.
 *
 * ── THE SUBMIT TARGET IS A FUNCTIONAL GAP — READ THIS ────────────────────────────────
 * The live site posts to Framer's hosted forms API:
 *
 *     https://api.framer.com/forms/v1/forms/e6df2e52-1e24-41ef-b5cf-af8e91c6c40e/submit
 *
 * (MEASURED, `czQha9DIH.js`: `<FormContainer action="…" className="framer-qzjgoc" …>`).
 * That endpoint cannot survive the port:
 *   • the form id is bound to the Framer project, and the site is leaving Framer;
 *   • Framer's `submitForm()` sends three headers this port cannot produce —
 *     `Framer-Site-Id` (the project hash, injected by Framer's runtime `FormContext`),
 *     `Framer-POW` (a proof-of-work secret from `calculateProofOfWork()`, a Framer
 *     runtime primitive), and `Framer-Form-Fields`;
 *   • `handleSubmit` bails out early unless BOTH `action` and `projectHash` are set, so
 *     re-pointing at the same URL without the site id would silently do nothing anyway.
 *
 * So this component reproduces the markup, the native validation and ALL FIVE visual
 * states exactly, and wires submission to {@link ContactFormProps.onSubmit}. The default
 * handler is a no-op that resolves after {@link SUBMIT_LATENCY_MS} so the button still
 * cycles Default → Loading → Success. **Nothing is delivered anywhere.** The endpoint is
 * kept as the exported constant {@link FRAMER_FORM_ACTION} for reference only — it is
 * never fetched. Wiring a real destination (a Next.js route handler, Formspree, Resend…)
 * is a product decision for the user.
 *
 * ── Fidelity notes ───────────────────────────────────────────────────────────────────
 * • The button is NEVER given a `disabled` attribute. Framer renders a plain
 *   `motion.button type="submit"`; "Disabled" is purely `opacity: .5`. The sketch in
 *   `contact-form.md` adds `disabled={…}` — that is the doc's suggestion, not a measured
 *   fact, and following it would break the native-validation bubble (a disabled button
 *   cannot submit, so the browser never reports the empty required fields).
 * • `incomplete` → `complete` is decided by EMPTINESS ONLY, never by validity.
 *   `anyEmptyRequiredFields()` (MEASURED) walks the form for `required && value === ""`.
 *   So typing `not-an-email` into the email field turns the button white/enabled; the
 *   browser's own constraint validation is what blocks the submit.
 * • The error state is STICKY (MEASURED `formReducer`): once `error`, every later
 *   `complete`/`incomplete` dispatch returns `error` again, and `stateCanSubmitForm`
 *   excludes it — so after a failure the live form can never be resubmitted without a
 *   reload. Reproduced verbatim.
 * • All 11 honeypot inputs are present, in source order, with every attribute
 *   (`tabindex="-1"`, `autocomplete="one-time-code"`, `aria-hidden`,
 *   `position:absolute;transform:scale(0)`, and the four password-manager opt-outs).
 *   Framer renames them and appends metadata at submit time; with no endpoint there is
 *   nothing to rename them for, so they are inert decoys — which is still what they are
 *   on the live site for any bot that fills them in.
 * • The spinner mask is inlined as a `data:` URI. Framer serves it from
 *   `framerusercontent.com/images/pGiXYozQ3mE4cilNOItfe2L2fUA.svg?width=20&height=20`
 *   and that URL is NOT in `_source/asset-map.json` (the mirror only walked the SSR DOM;
 *   this one is referenced from JS). Shipping the remote URL is forbidden, and
 *   `public/assets/` is outside this task's file ownership, so the 199-byte annulus
 *   (outer r=10, inner r=8 in a 20×20 box) is embedded verbatim below.
 */

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

import type { ReducedMotionPolicy } from "@/components/primitives";

/* -------------------------------------------------------------------------- */
/* Measured constants                                                          */
/* -------------------------------------------------------------------------- */

/**
 * The real endpoint on the live site. MEASURED, `czQha9DIH.js`. Exported for the record —
 * this module never fetches it. See the header comment.
 */
export const FRAMER_FORM_ACTION =
  "https://api.framer.com/forms/v1/forms/e6df2e52-1e24-41ef-b5cf-af8e91c6c40e/submit" as const;

/** Headers Framer's `submitForm()` requires and that this port cannot produce. MEASURED. */
export const FRAMER_REQUIRED_HEADERS = [
  "Framer-Site-Id",
  "Framer-POW",
  "Framer-Form-Fields",
] as const;

/** `tHtqDFzFd.js`: `serializationHash`. */
export const FORM_BUTTON_SERIALIZATION_HASH = "framer-BKF2B" as const;

/** `tHtqDFzFd.js`: `cycleOrder`. */
export const FORM_BUTTON_CYCLE_ORDER = [
  "wtXR7mSKH",
  "ihmYY2GpC",
  "PUgAJ6SU5",
  "NtaTwaGC1",
  "uuWqgdLDI",
] as const;

/** `tHtqDFzFd.js`: `humanReadableVariantMap`, inverted. */
export const FORM_BUTTON_VARIANT_NAMES = {
  wtXR7mSKH: "Default",
  ihmYY2GpC: "Loading",
  PUgAJ6SU5: "Disabled",
  NtaTwaGC1: "Success",
  uuWqgdLDI: "Error",
} as const;

/** `tHtqDFzFd.js`: `variantClassNames`. */
export const FORM_BUTTON_VARIANT_CLASS_NAMES = {
  wtXR7mSKH: "framer-v-50bc0r",
  ihmYY2GpC: "framer-v-1r93gqw",
  PUgAJ6SU5: "framer-v-adf7wq",
  NtaTwaGC1: "framer-v-tiam78",
  uuWqgdLDI: "framer-v-h2ldte",
} as const;

/** `tHtqDFzFd.js`: `transition1` — every variant change, including hover/press. */
export const FORM_BUTTON_TRANSITION = {
  type: "tween",
  duration: 0.2,
  ease: [0.44, 0, 0.56, 1],
  delay: 0,
} as const;

/** `tHtqDFzFd.js`: `transition2` — the spinner's linear 1s revolution. */
export const SPINNER_TRANSITION = {
  type: "tween",
  duration: 1,
  ease: [0, 0, 1, 1],
  delay: 0,
} as const;

/**
 * How long the DEFAULT no-op handler stays in `Loading` before reporting success.
 *
 * There is no measured network latency to copy (the real one is a live POST behind a
 * proof-of-work computation). This is deliberately pinned to the one measured duration
 * that governs the Loading state — `transition2.duration = 1` — so the spinner completes
 * exactly ONE revolution and the hand-off reads as intentional rather than arbitrary.
 * Pass your own `onSubmit` to take over the timing entirely.
 */
export const SUBMIT_LATENCY_MS = 1000;

/* -------------------------------------------------------------------------- */
/* Field data — now shared with the API route, see ./contact-fields             */
/* -------------------------------------------------------------------------- */

import {
  CONTACT_FORM_FIELDS,
  CONTACT_HONEYPOT_FIELDS,
  type ContactFormField,
} from "./contact-fields";

/* Re-exported so every existing importer of this module keeps working unchanged. */
export {
  CONTACT_FORM_FIELDS,
  CONTACT_HONEYPOT_FIELDS,
  type ContactFormField,
};

/** The mask that turns the conic gradient into a 2px ring. See the header comment. */
const SPINNER_MASK =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Cpath fill='%23CCC' d='M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0'/%3E%3C/svg%3E\") alpha no-repeat center / cover add";

/** `tHtqDFzFd.js`: the Conic div's background. */
const SPINNER_CONIC =
  "conic-gradient(from 0deg at 50% 50%, rgba(255, 255, 255, 0) 7.208614864864882deg, rgb(0, 0, 0) 342deg)";

/* -------------------------------------------------------------------------- */
/* State machine (MEASURED — Framer's `FormContainer.tsx`)                      */
/* -------------------------------------------------------------------------- */

/** Framer's five reducer states. `complete` is the one with no variant of its own. */
export type ContactFormState =
  | "incomplete"
  | "complete"
  | "pending"
  | "success"
  | "error";

type FormAction =
  | { type: "complete" }
  | { type: "incomplete" }
  | { type: "submit" }
  | { type: "success" }
  | { type: "error" };

/**
 * `formReducer` — verbatim. The two `if (state === "error")` guards are what makes the
 * error state sticky; do not "fix" them.
 */
export function formReducer(
  state: ContactFormState,
  action: FormAction,
): ContactFormState {
  switch (action.type) {
    case "complete":
      if (state === "error") return "error";
      return "complete";
    case "incomplete":
      if (state === "error") return "error";
      return "incomplete";
    case "submit":
      return "pending";
    case "success":
      return "success";
    case "error":
      return "error";
  }
}

/** `stateCanSubmitForm` — verbatim. */
export function stateCanSubmitForm(state: ContactFormState): boolean {
  return state === "incomplete" || state === "complete";
}

export type FormButtonVariantId =
  (typeof FORM_BUTTON_CYCLE_ORDER)[number];

/**
 * `formVariants(...)` from `czQha9DIH.js`, specialised to the four overrides that module
 * actually passes. `complete` (and anything else) falls through to `Default` — which is
 * why "all fields filled" shows a white, clickable button.
 */
export function formButtonVariant(
  state: ContactFormState,
): FormButtonVariantId {
  switch (state) {
    case "success":
      return "NtaTwaGC1";
    case "pending":
      return "ihmYY2GpC";
    case "error":
      return "uuWqgdLDI";
    case "incomplete":
      return "PUgAJ6SU5";
    default:
      return "wtXR7mSKH";
  }
}

/**
 * `anyEmptyRequiredFields` — MEASURED. Framer recurses `element.children` looking for a
 * required input/textarea/select whose `value === ""`. A descendant query is the same
 * predicate over the same node set, and is what this uses.
 *
 * VALIDITY IS NOT CONSULTED. That is the whole point of the `incomplete` state.
 */
export function anyEmptyRequiredFields(form: HTMLFormElement): boolean {
  const fields = form.querySelectorAll<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >("input[required], textarea[required], select[required]");
  for (const field of fields) {
    if (field.value === "") return true;
  }
  return false;
}

/* -------------------------------------------------------------------------- */
/* Button variant targets (MEASURED — `tHtqDFzFd.js` `variants={…}` + base style) */
/* -------------------------------------------------------------------------- */

interface ButtonTarget {
  readonly backgroundColor: string;
  readonly opacity: number;
}

const BASE_BACKGROUND = "rgb(255, 255, 255)";
const HOVER_BACKGROUND =
  "var(--token-5c4c4689-2e9f-4d75-8648-a6fa99ee1dd8, rgba(255, 255, 255, 0.5))";

/**
 * Framer only lists the DELTAS per variant and lets the base style supply the rest; these
 * are those deltas resolved against the base (`backgroundColor: rgb(255,255,255)`,
 * `opacity: 1`) so every target is complete and `motion` has something to animate from.
 */
const BUTTON_TARGETS: Readonly<Record<FormButtonVariantId, ButtonTarget>> = {
  wtXR7mSKH: { backgroundColor: BASE_BACKGROUND, opacity: 1 },
  ihmYY2GpC: { backgroundColor: BASE_BACKGROUND, opacity: 1 },
  PUgAJ6SU5: { backgroundColor: BASE_BACKGROUND, opacity: 0.5 },
  NtaTwaGC1: { backgroundColor: BASE_BACKGROUND, opacity: 1 },
  uuWqgdLDI: { backgroundColor: "rgba(255, 34, 68, 0.15)", opacity: 1 },
};

/** Both `wtXR7mSKH-hover` and `wtXR7mSKH-pressed` are this exact target. MEASURED. */
const BUTTON_GESTURE_TARGET: ButtonTarget = {
  backgroundColor: HOVER_BACKGROUND,
  opacity: 1,
};

/** The label text per variant. `Loading` hides the label entirely (`isDisplayed()`). */
const BUTTON_LABEL: Readonly<Record<FormButtonVariantId, string>> = {
  wtXR7mSKH: "Submit Form",
  ihmYY2GpC: "Submit Form",
  PUgAJ6SU5: "Submit Form",
  NtaTwaGC1: "Thank You",
  uuWqgdLDI: "Something went wrong",
};

/** Error is the only variant that recolours the label. MEASURED. */
const ERROR_TEXT_COLOR =
  "var(--token-dc401052-8456-42c8-a24e-d36945f44ebf, rgb(181, 0, 0))";

/* -------------------------------------------------------------------------- */
/* Props                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Your submit handler. Resolve → the button goes `Success`; throw or reject → `Error`
 * (and, faithfully to Framer, the form then refuses every further submit).
 */
export type ContactFormSubmitHandler = (
  data: FormData,
  form: HTMLFormElement,
) => void | Promise<void>;

/**
 * The default handler. A no-op that still cycles the visual states: it waits
 * {@link SUBMIT_LATENCY_MS} (one full measured spinner revolution) and resolves.
 * IT SENDS NOTHING ANYWHERE.
 */
export const noopSubmit: ContactFormSubmitHandler = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, SUBMIT_LATENCY_MS);
  });

/** Where {@link postSubmit} delivers. Kept here so a harness can point it elsewhere. */
export const CONTACT_ENDPOINT = "/api/contact";

/**
 * The real handler: POSTs every field — including the honeypot decoys, which the server
 * checks too — to {@link CONTACT_ENDPOINT}.
 *
 * It THROWS on a non-2xx reply, because `ContactForm` moves to its `error` variant when
 * the promise rejects and to `success` when it resolves; returning normally on a failed
 * send would show the visitor a success tick for a message that was never delivered.
 * The thrown message is the server's own, so the copy shown is written once, server-side.
 */
export const postSubmit: ContactFormSubmitHandler = async (data) => {
  const payload = Object.fromEntries(
    [...data.entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]),
  );

  const response = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const detail = await response
      .json()
      .then((b: { error?: string }) => b?.error)
      .catch(() => undefined);
    throw new Error(detail ?? "Your message could not be sent. Please try again.");
  }
};

export interface ContactFormProps {
  /** Where a submit goes. Defaults to {@link postSubmit} (`POST /api/contact`).
   *  Pass {@link noopSubmit} in screenshot/visual harnesses to avoid a live send. */
  onSubmit?: ContactFormSubmitHandler;
  /** Fired after the state has moved to `success`. */
  onSuccess?: () => void;
  /** Fired after the state has moved to `error`, with whatever `onSubmit` threw. */
  onError?: (error: unknown) => void;
  /**
   * Force a visual state (screenshot rigs, visual tests). While set, the form is
   * display-only: the internal reducer still runs but the button renders this state.
   */
  forcedState?: ContactFormState;
  /** `"settle"` (default) honours `prefers-reduced-motion` by parking the spinner. */
  reducedMotion?: ReducedMotionPolicy;
  /** Appended after the Framer `framer-qzjgoc` class. */
  className?: string;
  /** DOM id on the `<form>`. The live site sets none. */
  id?: string;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export function ContactForm(props: ContactFormProps): React.ReactElement {
  const {
    onSubmit = postSubmit,
    onSuccess,
    onError,
    forcedState,
    reducedMotion = "settle",
    className,
    id,
  } = props;

  const [state, dispatch] = React.useReducer(
    formReducer,
    "incomplete" as ContactFormState,
  );
  const submissionInProgress = React.useRef(false);

  // Controlled, exactly like Framer's `FormPlainTextInput` (`value: optimisticValue`).
  // The only thing the value drives visually is `framer-form-input-empty`, which Framer
  // puts on `<input>` and NOT on `<textarea>` — reproduced.
  const [values, setValues] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(CONTACT_FORM_FIELDS.map((f) => [f.name, ""])),
  );

  const prefersReducedMotion = useReducedMotion();
  const settle = reducedMotion === "settle" && prefersReducedMotion === true;

  const effectiveState = forcedState ?? state;
  const variantId = formButtonVariant(effectiveState);
  const isLoading = variantId === "ihmYY2GpC";
  const isDefault = variantId === "wtXR7mSKH";

  /**
   * Framer's `checkValidity` — bound to the FORM, not to the fields, and dispatching
   * nothing but `complete` / `incomplete`. React's `onChange` is the `input` event, so it
   * bubbles here from every field, exactly as it does in Framer's `motion.form`.
   */
  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      dispatch({
        type: anyEmptyRequiredFields(event.currentTarget)
          ? "incomplete"
          : "complete",
      });
    },
    [],
  );

  /** Per-field value tracking. Framer's inputs are controlled the same way. */
  const handleFieldChange = React.useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      const { name, value } = event.currentTarget;
      setValues((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  /* ---- Framer's `handleSubmit` ---- */
  const handleSubmit = React.useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submissionInProgress.current) return;
      submissionInProgress.current = true;

      const form = event.currentTarget;
      const data = new FormData(form);
      dispatch({ type: "submit" });

      try {
        await onSubmit(data, form);
        dispatch({ type: "success" });
        onSuccess?.();
      } catch (error) {
        dispatch({ type: "error" });
        onError?.(error);
        console.error(error);
      }
      submissionInProgress.current = false;
    },
    [onSubmit, onSuccess, onError],
  );

  /* ---- Framer's `handleKeyDown`: Enter submits unless you are in the textarea ---- */
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      if (event.target instanceof HTMLTextAreaElement) return;
      if (event.key === "Enter" && event.currentTarget.checkValidity()) {
        event.preventDefault();
        void handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>);
      }
    },
    [handleSubmit],
  );

  const target = BUTTON_TARGETS[variantId];

  return (
    <form
      id={id}
      className={
        className === undefined ? "framer-qzjgoc" : `framer-qzjgoc ${className}`
      }
      data-border="true"
      onSubmit={
        stateCanSubmitForm(state)
          ? (event) => void handleSubmit(event)
          : (event) => event.preventDefault()
      }
      onKeyDown={handleKeyDown}
      onChange={handleChange}
    >
      {CONTACT_FORM_FIELDS.map((field) => (
        <label className={field.labelClassName} key={field.name}>
          <div
            className={field.textClassName}
            data-framer-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p
              className="framer-text framer-styles-preset-529u5a"
              data-styles-preset="kOiotlVqs"
            >
              {field.label}
            </p>
          </div>
          <div
            className={
              field.type === "textarea"
                ? `framer-form-text-input framer-form-input-wrapper ${field.inputClassName} framer-form-textarea-input-type`
                : field.type === "text"
                  ? `framer-form-text-input framer-form-input-wrapper ${field.inputClassName} framer-form-text-input-type`
                  : `framer-form-text-input framer-form-input-wrapper ${field.inputClassName}`
            }
          >
            {field.type === "textarea" ? (
              <textarea
                required={field.required}
                name={field.name}
                placeholder={field.placeholder}
                className="framer-form-input"
                value={values[field.name] ?? ""}
                onChange={handleFieldChange}
              />
            ) : (
              <input
                type={field.type}
                required={field.required}
                name={field.name}
                placeholder={field.placeholder}
                className={
                  (values[field.name] ?? "") === ""
                    ? "framer-form-input framer-form-input-empty"
                    : "framer-form-input"
                }
                value={values[field.name] ?? ""}
                onChange={handleFieldChange}
              />
            )}
          </div>
        </label>
      ))}

      {/* `.ssr-variant` is `display: contents` — it is in the SSR, so it stays. */}
      <div className="ssr-variant">
        <div className="framer-bby5ym-container">
          <motion.button
            type="submit"
            className={`${FORM_BUTTON_SERIALIZATION_HASH} framer-d2uK3 framer-50bc0r ${FORM_BUTTON_VARIANT_CLASS_NAMES[variantId]}`}
            data-framer-name={FORM_BUTTON_VARIANT_NAMES[variantId]}
            data-reset="button"
            style={{
              backgroundColor: target.backgroundColor,
              width: "100%",
              borderBottomLeftRadius: 24,
              borderBottomRightRadius: 24,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              opacity: target.opacity,
            }}
            initial={false}
            animate={{
              backgroundColor: target.backgroundColor,
              opacity: target.opacity,
            }}
            whileHover={isDefault ? { ...BUTTON_GESTURE_TARGET } : undefined}
            whileTap={isDefault ? { ...BUTTON_GESTURE_TARGET } : undefined}
            transition={FORM_BUTTON_TRANSITION}
          >
            {/* `isDisplayed()`: the label is present in every variant except Loading. */}
            {!isLoading && (
              <div
                className="framer-lxklzs"
                data-framer-component-type="RichTextContainer"
                style={
                  {
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    ...(variantId === "uuWqgdLDI"
                      ? { "--extracted-r6o4lv": ERROR_TEXT_COLOR }
                      : {}),
                    transform: "none",
                  } as React.CSSProperties
                }
              >
                <p
                  className="framer-text framer-styles-preset-1omitwj"
                  data-styles-preset="CZhcsmPUo"
                  style={
                    variantId === "uuWqgdLDI"
                      ? ({
                          "--framer-text-color": `var(--extracted-r6o4lv, ${ERROR_TEXT_COLOR})`,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {BUTTON_LABEL[variantId]}
                </p>
              </div>
            )}

            {/* `isDisplayed1()`: the spinner exists ONLY in Loading. */}
            {isLoading && (
              <div
                className="framer-1g0wz1g"
                data-framer-name="Spinner"
                style={{ mask: SPINNER_MASK, WebkitMask: SPINNER_MASK }}
              >
                <motion.div
                  className="framer-dq0znb"
                  data-framer-name="Conic"
                  style={{
                    background: SPINNER_CONIC,
                    mask: SPINNER_MASK,
                    WebkitMask: SPINNER_MASK,
                  }}
                  initial={{ rotate: 0 }}
                  animate={settle ? { rotate: 0 } : { rotate: 360 }}
                  transition={
                    settle
                      ? { duration: 0 }
                      : {
                          duration: SPINNER_TRANSITION.duration,
                          ease: [...SPINNER_TRANSITION.ease] as [
                            number,
                            number,
                            number,
                            number,
                          ],
                          repeat: Infinity,
                          repeatType: "loop",
                          repeatDelay: 0,
                        }
                  }
                >
                  <div
                    className="framer-1f8zb8c"
                    data-framer-name="Rounding"
                    style={{
                      backgroundColor: "rgb(255, 255, 255)",
                      borderBottomLeftRadius: 1,
                      borderBottomRightRadius: 1,
                      borderTopLeftRadius: 1,
                      borderTopRightRadius: 1,
                      transform: "translateX(-50%)",
                    }}
                  />
                </motion.div>
              </div>
            )}
          </motion.button>
        </div>
      </div>

      {/* Honeypots — rendered after the children by Framer's `<HoneypotFields />`. */}
      {CONTACT_HONEYPOT_FIELDS.map((name) => (
        <input
          key={name}
          type="text"
          name={name}
          tabIndex={-1}
          autoComplete="one-time-code"
          aria-hidden="true"
          style={{ position: "absolute", transform: "scale(0)" }}
          data-1p-ignore="true"
          data-lpignore="true"
          data-form-type="other"
          data-bwignore="true"
          defaultValue=""
        />
      ))}
    </form>
  );
}

export default ContactForm;
