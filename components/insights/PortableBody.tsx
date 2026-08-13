import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents, type PortableTextBlock } from "next-sanity";
import { urlFor } from "@/sanity/image";
import { blockToPlainText, slugifyHeading } from "@/lib/insights";

const CALLOUT_LABEL: Record<string, string> = {
  definition: "Definition",
  insight: "Insight",
  warning: "Watch out",
  application: "What this means for you",
};

function headingStyle(size: number, top: number) {
  return {
    fontFamily: "var(--font-heading)",
    fontSize: size,
    fontWeight: 600,
    lineHeight: 1.25,
    letterSpacing: "-0.02em",
    color: "var(--text-1)",
    marginTop: top,
    marginBottom: 16,
    scrollMarginTop: 100,
  } as const;
}

/**
 * `ids` maps a heading block's `_key` to the anchor the table of contents links
 * to. Headings not in the map fall back to slugifying their own text.
 */
export function createPortableComponents(ids: Map<string, string>): PortableTextComponents {
  const anchorFor = (value: PortableTextBlock) =>
    ids.get(value._key as string) ?? slugifyHeading(blockToPlainText(value));

  return {
    block: {
      h2: ({ children, value }) => (
        <h2 id={anchorFor(value)} style={headingStyle(30, 56)}>
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3 id={anchorFor(value)} style={headingStyle(23, 40)}>
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-1)",
            marginTop: 28,
            marginBottom: 10,
          }}
        >
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p
          style={{
            fontSize: 17.5,
            lineHeight: 1.78,
            color: "var(--text-2)",
            marginBottom: 22,
          }}
        >
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote
          style={{
            borderLeft: "3px solid var(--accent)",
            paddingLeft: 22,
            margin: "32px 0",
            fontSize: 19,
            lineHeight: 1.7,
            fontStyle: "italic",
            color: "var(--text-1)",
          }}
        >
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul style={{ margin: "0 0 24px 0", paddingLeft: 22, listStyle: "disc" }}>{children}</ul>
      ),
      number: ({ children }) => (
        <ol style={{ margin: "0 0 24px 0", paddingLeft: 22, listStyle: "decimal" }}>{children}</ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li style={{ fontSize: 17.5, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 10 }}>
          {children}
        </li>
      ),
      number: ({ children }) => (
        <li style={{ fontSize: 17.5, lineHeight: 1.75, color: "var(--text-2)", marginBottom: 10 }}>
          {children}
        </li>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong style={{ color: "var(--text-1)", fontWeight: 600 }}>{children}</strong>
      ),
      em: ({ children }) => <em>{children}</em>,
      code: ({ children }) => (
        <code
          style={{
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: "0.88em",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 5,
            padding: "2px 6px",
            color: "var(--text-1)",
          }}
        >
          {children}
        </code>
      ),
      link: ({ children, value }) => {
        const href = String(value?.href ?? "");
        const isInternal = href.startsWith("/");
        const style = {
          color: "var(--accent)",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          textDecorationThickness: 1,
        } as const;

        if (isInternal) {
          return (
            <Link href={href} style={style}>
              {children}
            </Link>
          );
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
            {children}
          </a>
        );
      },
    },

    types: {
      pteImage: ({ value }) => {
        if (!value?.image) return null;
        const dimensions = value.dimensions as { width: number; height: number } | undefined;
        return (
          <figure style={{ margin: "40px 0" }}>
            <Image
              src={urlFor(value.image).width(1400).url()}
              alt={value.alt ?? ""}
              width={dimensions?.width ?? 1400}
              height={dimensions?.height ?? 800}
              sizes="(max-width: 900px) 100vw, 760px"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: 14,
                border: "1px solid var(--border)",
              }}
            />
            {value.caption && (
              <figcaption
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  color: "var(--text-3)",
                  textAlign: "center",
                }}
              >
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      callout: ({ value }) => (
        <aside
          style={{
            margin: "32px 0",
            padding: "22px 24px",
            borderRadius: 14,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 10,
            }}
          >
            {CALLOUT_LABEL[value.tone as string] ?? "Note"}
          </div>
          {value.heading && (
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 18,
                fontWeight: 600,
                color: "var(--text-1)",
                marginBottom: 8,
              }}
            >
              {value.heading}
            </div>
          )}
          <p style={{ fontSize: 16.5, lineHeight: 1.7, color: "var(--text-2)", margin: 0 }}>
            {value.body}
          </p>
        </aside>
      ),

      codeBlock: ({ value }) => (
        <div style={{ margin: "32px 0" }}>
          {value.filename && (
            <div
              style={{
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: 12.5,
                color: "var(--text-3)",
                padding: "9px 16px",
                background: "var(--bg-3)",
                border: "1px solid var(--border)",
                borderBottom: "none",
                borderRadius: "12px 12px 0 0",
              }}
            >
              {value.filename}
            </div>
          )}
          <pre
            style={{
              margin: 0,
              padding: "18px 20px",
              overflowX: "auto",
              background: "var(--bg-2)",
              border: "1px solid var(--border)",
              borderRadius: value.filename ? "0 0 12px 12px" : 12,
              fontSize: 14,
              lineHeight: 1.65,
              color: "var(--text-1)",
            }}
          >
            <code style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
              {value.code}
            </code>
          </pre>
        </div>
      ),

      dataTable: ({ value }) => {
        const columns: string[] = value.columns ?? [];
        const rows: { _key: string; cells?: string[] }[] = value.rows ?? [];
        return (
          <figure style={{ margin: "36px 0" }}>
            <div style={{ overflowX: "auto", borderRadius: 12, border: "1px solid var(--border)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 480 }}>
                <thead>
                  <tr style={{ background: "var(--bg-3)" }}>
                    {columns.map((column) => (
                      <th
                        key={column}
                        scope="col"
                        style={{
                          textAlign: "left",
                          padding: "13px 16px",
                          fontSize: 13,
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--text-1)",
                          borderBottom: "1px solid var(--border)",
                        }}
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row._key}>
                      {(row.cells ?? []).map((cell, index) => (
                        <td
                          key={`${row._key}-${index}`}
                          style={{
                            padding: "13px 16px",
                            fontSize: 15.5,
                            lineHeight: 1.6,
                            color: index === 0 ? "var(--text-1)" : "var(--text-2)",
                            borderBottom: "1px solid var(--border)",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {value.caption && (
              <figcaption style={{ marginTop: 12, fontSize: 14, color: "var(--text-3)" }}>
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
    },
  };
}

export function PortableBody({
  value,
  headingIds,
}: {
  value: PortableTextBlock[];
  headingIds: Map<string, string>;
}) {
  return <PortableText value={value} components={createPortableComponents(headingIds)} />;
}
