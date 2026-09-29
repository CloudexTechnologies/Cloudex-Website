/**
 * Renders schema.org JSON-LD. `<` is escaped so no string in the data can close the
 * `<script>` element early.
 */

import * as React from "react";

export function JsonLd({ data }: { data: Record<string, unknown> | readonly Record<string, unknown>[] }): React.ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export default JsonLd;
