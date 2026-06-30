import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { formatDate, getArticleImageUrl } from "@/lib/articles";
import { fetchArticleBySlug, fetchPublishedArticles } from "@/lib/api";

function articleContentLines(content: string | string[]) {
  const text = Array.isArray(content) ? content.join("\n\n") : content;
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function isHeadingLine(line: string) {
  if (line.startsWith("- ")) return false;
  if (/^Original source:/i.test(line)) return false;
  if (/^(Issued at|Valid Beginning|Valid Until|Location of Eye\/center|Movement|Strength|Forecast Position)/i.test(line)) {
    return true;
  }
  const letters = line.replace(/[^A-Za-z]/g, "");
  return letters.length >= 8 && line === line.toUpperCase();
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = await fetchPublishedArticles();
  const related = allArticles
    .filter((item) => item.id !== article.id && item.category.slug === article.category.slug)
    .slice(0, 3);
  const coverImageUrl = getArticleImageUrl(article);

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
            <span>By {article.author?.username || "PhilWatch Desk"}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] w-full sm:h-[460px]">
            <Image
              src={coverImageUrl}
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
            {articleContentLines(article.content).map((line, index) => {
              const key = `${index}-${line}`;
              if (/^Original source:/i.test(line)) {
                const sourceUrl = line.replace(/^Original source:\s*/i, "");
                return (
                  <p key={key} className="mt-8 border-t border-zinc-200 pt-5 text-sm leading-6 text-zinc-500">
                    Original source:{" "}
                    <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-emerald-700">
                      {sourceUrl}
                    </a>
                  </p>
                );
              }
              if (line.startsWith("- ")) {
                return (
                  <div key={key} className="mb-2 flex gap-3 text-lg leading-8 text-zinc-700">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 bg-emerald-700" />
                    <p>{line.slice(2)}</p>
                  </div>
                );
              }
              if (isHeadingLine(line)) {
                return (
                  <h2 key={key} className="mb-3 mt-8 text-2xl font-bold leading-tight text-zinc-950 first:mt-0">
                    {line}
                  </h2>
                );
              }
              return (
                <p key={key} className="mb-5 text-lg leading-8 text-zinc-700">
                  {line}
                </p>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag.name} className="bg-zinc-100 px-3 py-2 text-sm font-medium text-zinc-700">
                {tag.name}
              </span>
            ))}
          </div>
          {article.sources.length ? (
            <section className="border-t border-zinc-200 pt-6">
              <h2 className="text-xl font-bold text-zinc-950">Sources</h2>
              <div className="mt-3 grid gap-2">
                {article.sources.map((source) => (
                  <a
                    key={source.sourceUrl}
                    href={source.sourceUrl}
                    className="text-sm font-medium text-emerald-700"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {source.sourceName}
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
              : allArticles
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
