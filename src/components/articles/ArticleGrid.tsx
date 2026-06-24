import type { Article } from "@/types/article";

import { ArticleCard } from "./ArticleCard";

export function ArticleGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return (
      <div className="border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
        No published articles match this view yet.
      </div>
    );
  }

  return (
    <div className="grid gap-5">
      {articles.map((article, index) => (
        <ArticleCard key={article.id} article={article} priority={index === 0} />
      ))}
    </div>
  );
}
