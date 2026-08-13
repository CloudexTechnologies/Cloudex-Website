import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function Pagination({
  basePath,
  current,
  totalPages,
}: {
  basePath: string;
  current: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const href = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);

  const link = {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 18px",
    borderRadius: "var(--radius-pill)",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    color: "var(--text-2)",
    fontSize: 14,
    textDecoration: "none",
  } as const;

  return (
    <nav
      aria-label="Pagination"
      style={{
        marginTop: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
      }}
    >
      {current > 1 ? (
        <Link href={href(current - 1)} style={link} rel="prev">
          <ArrowLeft size={15} strokeWidth={1.8} />
          Newer
        </Link>
      ) : (
        <span style={{ ...link, opacity: 0.35 }}>
          <ArrowLeft size={15} strokeWidth={1.8} />
          Newer
        </span>
      )}

      <span style={{ fontSize: 14, color: "var(--text-3)" }}>
        Page {current} of {totalPages}
      </span>

      {current < totalPages ? (
        <Link href={href(current + 1)} style={link} rel="next">
          Older
          <ArrowRight size={15} strokeWidth={1.8} />
        </Link>
      ) : (
        <span style={{ ...link, opacity: 0.35 }}>
          Older
          <ArrowRight size={15} strokeWidth={1.8} />
        </span>
      )}
    </nav>
  );
}
