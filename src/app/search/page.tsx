import Link from "next/link";
import { redirect } from "next/navigation";
import { ArticleGrid } from "@/components/articles/ArticleGrid";
import { SearchForm } from "@/components/ui/SearchForm";
import { searchBackendArticles } from "@/lib/publicContentApi";
import { searchQueryLength } from "@/lib/searchQuery";
import type { Article, Paginated } from "@/types/article";

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value;

const searchHref = (query: string, page: number) =>
  `/search?${new URLSearchParams({ q: query, page: String(page) })}`;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}) {
  const params = await searchParams;
  const query = firstValue(params.q) || "";
  const queryTooLong = searchQueryLength(query) > 120;
  const rawPage = firstValue(params.page) || "1";
  const parsedPage = /^\d+$/.test(rawPage) ? Number(rawPage) : NaN;
  const page = Number.isSafeInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  let result: Paginated<Article> | null = null;
  if (!queryTooLong) {
    try {
      result = await searchBackendArticles(query, page);
    } catch {
      // Keep dependency failures distinct from an empty successful search.
    }
  }
  const lastPage = Math.max(1, result?.meta.totalPages ?? 1);
  if (result && page > lastPage) redirect(searchHref(query, lastPage));

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Search</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">Find Articles</h1>
        <p className="mt-3 text-zinc-600">Search by title, content, tag, or category.</p>
      </div>
      <SearchForm key={query} defaultValue={query} />
      <div className="mt-8">
        {result ? (
          <>
            <p className="mb-4 text-sm text-zinc-600">
              {result.meta.total} {result.meta.total === 1 ? "article" : "articles"} found
            </p>
            <ArticleGrid articles={result.data} />
            {result.meta.totalPages > 1 && (
              <nav aria-label="Search results pagination" className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
                {page > 1 ? (
                  <Link href={searchHref(query, page - 1)} className="border border-zinc-300 px-4 py-3 font-semibold hover:border-emerald-700 hover:text-emerald-700">
                    Previous
                  </Link>
                ) : (
                  <span aria-disabled="true" className="border border-zinc-200 px-4 py-3 text-zinc-400">Previous</span>
                )}
                <span>Page {page} of {lastPage}</span>
                {page < lastPage ? (
                  <Link href={searchHref(query, page + 1)} className="border border-zinc-300 px-4 py-3 font-semibold hover:border-emerald-700 hover:text-emerald-700">
                    Next
                  </Link>
                ) : (
                  <span aria-disabled="true" className="border border-zinc-200 px-4 py-3 text-zinc-400">Next</span>
                )}
              </nav>
            )}
          </>
        ) : (
          <p role="alert" className="border border-red-200 bg-red-50 p-6 text-red-800">
            {queryTooLong
              ? "Search terms must be 120 characters or fewer."
              : "Search is temporarily unavailable. Please try again."}
          </p>
        )}
      </div>
    </main>
  );
}
