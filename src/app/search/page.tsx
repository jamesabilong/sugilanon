import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { SearchForm } from "@/components/ui/SearchForm";
import { searchBackendArticles } from "@/lib/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || "";
  const articles = await searchBackendArticles(query);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Search</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">Find Articles</h1>
        <p className="mt-3 text-zinc-600">Search by title, content, tag, or category.</p>
      </div>
      <SearchForm defaultValue={query} />
      <div className="mt-8">
        <ArticleGrid articles={articles} />
      </div>
    </main>
  );
}
