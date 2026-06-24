import { notFound } from "next/navigation";

import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { findCategoryBySlug, getArticlesByCategory } from "@/lib/articles";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = findCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(slug);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Category</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">{category.name}</h1>
        <p className="mt-3 leading-7 text-zinc-600">{category.description}</p>
      </div>
      <ArticleGrid articles={articles} />
    </main>
  );
}
