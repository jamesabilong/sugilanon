import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { findArticleBySlug, formatDate, getPublishedArticles } from "@/lib/articles";

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const related = getPublishedArticles()
    .filter((item) => item.id !== article.id && item.category.slug === article.category.slug)
    .slice(0, 3);

  return (
    <main className="bg-white">
      <article>
        <header className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            href={`/category/${article.category.slug}`}
            className="text-sm font-semibold uppercase tracking-wide text-emerald-700"
          >
            {article.category.name}
          </Link>
          <h1 className="mt-3 text-4xl font-bold leading-tight text-zinc-950 sm:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-600">{article.summary}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-500">
            <span>By {article.author}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] w-full sm:h-[460px]">
            <Image
            src={article.coverImageUrl}
            alt=""
              fill
              priority
              sizes="(min-width: 1024px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-none">
            {article.content.map((paragraph) => (
              <p key={paragraph} className="mb-5 text-lg leading-8 text-zinc-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag} className="bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700">
                {tag}
              </span>
            ))}
          </div>
          {article.sources.length ? (
            <section className="border-t border-zinc-200 pt-6">
              <h2 className="text-xl font-bold text-zinc-950">Sources</h2>
              <div className="mt-3 grid gap-2">
                {article.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    className="text-sm font-medium text-emerald-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.name}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>

      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-zinc-950">Related Articles</h2>
          <div className="mt-4 grid gap-4">
            {(related.length
              ? related
              : getPublishedArticles()
                  .filter((item) => item.id !== article.id)
                  .slice(0, 3)
            ).map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="border border-zinc-200 bg-white p-4 text-sm font-semibold text-zinc-800 hover:text-emerald-700"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
