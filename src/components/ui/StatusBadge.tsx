import type { ArticleStatus } from "@/types/article";

export function StatusBadge({ status }: { status: ArticleStatus }) {
  return (
    <span
      className={
        status === "published"
          ? "inline-flex items-center bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800"
          : "inline-flex items-center bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800"
      }
    >
      {status}
    </span>
  );
}
