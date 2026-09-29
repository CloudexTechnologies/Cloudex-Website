/**
 * Contact-form field definitions.
 *
 * Extracted from `ContactForm.tsx` because that module is `"use client"`: anything it
 * exports is a client reference, so the `/api/contact` route handler (server) cannot
 * read these arrays from it. Keeping them here means the form and the API validate
 * against exactly ONE definition of the fields and the honeypots — if a field is ever
 * renamed, the server cannot drift out of sync with the markup.
 *
 * No `"use client"`, no imports: pure data, safe on both sides of the boundary.
 */

/* -------------------------------------------------------------------------- */
/* Field data (MEASURED — `czQha9DIH.js`, five `FormPlainTextInput` calls)      */
/* -------------------------------------------------------------------------- */

export interface ContactFormField {
  /** `<label>` class from the SSR. */
  readonly labelClassName: string;
  /** The `RichTextContainer` wrapper class from the SSR. */
  readonly textClassName: string;
  /** `FormPlainTextInput`'s `className` — carries the `--framer-input-*` custom props. */
  readonly inputClassName: string;
  /** Visible label. VERBATIM. */
  readonly label: string;
  /** `inputName` → the DOM `name`. Note the lowercase "n" in `"Last name"` — verbatim. */
  readonly name: string;
  readonly placeholder: string;
  readonly type: "text" | "email" | "tel" | "textarea";
  readonly required: boolean;
}

export const CONTACT_FORM_FIELDS: readonly ContactFormField[] = [
  {
    labelClassName: "framer-1eq9xvb",
    textClassName: "framer-fycyaq",
    inputClassName: "framer-1sexggw",
    label: "First Name",
    name: "Name",
    placeholder: "Jane",
    type: "text",
    required: true,
  },
  {
    labelClassName: "framer-krhipc",
    textClassName: "framer-1n9wg43",
    inputClassName: "framer-10zmbs5",
    label: "Last Name",
    name: "Last name",
    placeholder: "Smith",
    type: "text",
    required: true,
  },
  {
    labelClassName: "framer-17er4tw",
    textClassName: "framer-mf27d3",
    inputClassName: "framer-a0luw9",
    label: "Email",
    name: "Email",
    placeholder: "Jane@mail.com",
    type: "email",
    required: true,
  },
  {
    labelClassName: "framer-1y78cre",
    textClassName: "framer-1973may",
    inputClassName: "framer-e9wjwz",
    label: "Phone",
    name: "Phone",
    placeholder: "+1(969) 819-8061",
    type: "tel",
    required: true,
  },
  {
    labelClassName: "framer-2sv3nq",
    textClassName: "framer-30xaty",
    inputClassName: "framer-dd0mao",
    label: "Message",
    name: "Message",
    placeholder: "Write your message here...",
    type: "textarea",
    required: true,
  },
] as const;

/**
 * The 11 honeypot decoys Framer's `useHoneypotFields()` renders after the form's children,
 * in SSR order. Note `message` (lowercase) sits alongside the REAL `Message` field.
 */
export const CONTACT_HONEYPOT_FIELDS = [
  "website",
  "company",
  "message",
  "subject",
  "title",
  "description",
  "feedback",
  "notes",
  "details",
  "remarks",
  "comments",
] as const;
