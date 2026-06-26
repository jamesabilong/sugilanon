import Link from "next/link";

import { formatDate, getArticleImageUrl } from "@/lib/articles";
import type { Article } from "@/types/article";

export function ArticleCard({ article, priority = false }: { article: Article; priority?: boolean }) {
  const imageUrl = getArticleImageUrl(article);

  return (
    <article className="grid overflow-hidden border border-zinc-200 bg-white md:grid-cols-[220px_1fr]">
      <Link
        href={`/articles/${article.slug}`}
        className="relative block min-h-52 bg-zinc-100 md:min-h-full"
      >
        <img
          src={imageUrl}
          alt=""
          fetchPriority={priority ? "high" : "auto"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </Link>
      <div className="flex flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
          <Link href={`/category/${article.category.slug}`} className="text-emerald-700">
            {article.category.name}
          </Link>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <h2 className="text-xl font-bold leading-tight text-zinc-950">
          <Link className="hover:text-emerald-700" href={`/articles/${article.slug}`}>
            {article.title}
          </Link>
        </h2>
        <p className="line-clamp-3 text-sm leading-6 text-zinc-600">{article.summary}</p>
        <p className="mt-auto text-sm text-zinc-500">
          By {article.author?.username || "PhilWatch Desk"}
        </p>
      </div>
    </article>
  );
}
