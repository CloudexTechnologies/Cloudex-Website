export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built from typed Sanity data, never from user-supplied HTML.
      // Escaping `<` still guards against a stray "</script>" inside a title or quote.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
