import Link from "next/link";

import { EarthquakeWatch } from "@/components/EarthquakeWatch";
import { formatDate, getArticleImageUrl } from "@/lib/articles";
import { fetchCategories, fetchLatestEarthquakes, fetchPublishedArticles } from "@/lib/api";

export default async function Home() {
  const [articles, categories, earthquakeFeed] = await Promise.all([
    fetchPublishedArticles("?limit=100"),
    fetchCategories(),
    fetchLatestEarthquakes(),
  ]);
  const [featured] = articles;
  const recommended = articles.slice(1, 4);
  const featuredImage = getArticleImageUrl(featured);

  return (
    <main>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:py-12 lg:px-8">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Featured Story
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
              Philippine community updates worth reading clearly.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              PhilWatch collects local news summaries, public-service guides, community notes, and
              source-linked explainers for readers who want practical details first.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/search"
                className="bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Browse Articles
              </Link>
              <Link
                href="/admin/login"
                className="border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 hover:border-emerald-700 hover:text-emerald-700"
              >
                Admin Login
              </Link>
            </div>
          </div>
          {featured ? (
            <article className="border border-zinc-200 bg-zinc-50">
              <Link
                href={`/articles/${featured.slug}`}
                className="relative block h-64 bg-zinc-200 sm:h-80"
              >
                <img
                  src={featuredImage}
                  alt=""
                  fetchPriority="high"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </Link>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {featured.category.name} / {formatDate(featured.publishedAt)}
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-zinc-950">
                  <Link href={`/articles/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{featured.summary}</p>
              </div>
            </article>
          ) : null}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Latest
              </p>
              <h2 className="mt-1 text-2xl font-bold text-zinc-950">Recent Articles</h2>
            </div>
            <Link href="/search" className="text-sm font-semibold text-emerald-700">
              View all
            </Link>
          </div>
          <div className="grid gap-5">
            {articles.map((article) => (
              <article key={article.id} className="border border-zinc-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  {article.category.name} / {formatDate(article.publishedAt)}
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-950">
                  <Link className="hover:text-emerald-700" href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{article.summary}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid content-start gap-6">
          <EarthquakeWatch feed={earthquakeFeed} />
          <section className="border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-bold text-zinc-950">Categories</h2>
            <div className="mt-4 grid gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-zinc-700 hover:text-emerald-700"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </section>
          <section className="border border-zinc-200 bg-white p-5">
            <h2 className="text-lg font-bold text-zinc-950">Recommended</h2>
            <div className="mt-4 grid gap-4">
              {recommended.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="text-sm font-semibold leading-6 text-zinc-800 hover:text-emerald-700"
                >
                  {article.title}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
