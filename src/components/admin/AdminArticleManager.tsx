"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/articles";
import { isAdminAuthenticated, loadArticles, saveArticles, setAdminAuthenticated } from "@/lib/admin-storage";
import type { Article } from "@/types/article";

export function AdminArticleManager() {
  const [articles, setArticles] = useState<Article[]>(() =>
    typeof window === "undefined" ? [] : loadArticles(),
  );

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      window.location.href = "/admin/login";
    }
  }, []);

  const stats = useMemo(
    () => ({
      published: articles.filter((article) => article.status === "published").length,
      drafts: articles.filter((article) => article.status === "draft").length,
      total: articles.length,
    }),
    [articles],
  );

  function updateStatus(id: string, status: Article["status"]) {
    const next = articles.map((article) =>
      article.id === id
        ? { ...article, status, publishedAt: status === "published" ? new Date().toISOString() : article.publishedAt, updatedAt: new Date().toISOString() }
        : article,
    );
    setArticles(next);
    saveArticles(next);
  }

  function removeArticle(id: string) {
    const next = articles.filter((article) => article.id !== id);
    setArticles(next);
    saveArticles(next);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Admin</p>
          <h1 className="mt-2 text-3xl font-bold text-zinc-950">Article Dashboard</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/articles/new" className="bg-zinc-950 px-4 py-3 text-sm font-semibold text-white">New Article</Link>
          <button
            type="button"
            onClick={() => {
              setAdminAuthenticated(false);
              window.location.href = "/";
            }}
            className="border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700"
          >
            Log out
          </button>
        </div>
      </div>

      <section className="grid gap-4 py-6 sm:grid-cols-3">
        {[
          ["Published", stats.published],
          ["Drafts", stats.drafts],
          ["Total Articles", stats.total],
        ].map(([label, value]) => (
          <div key={label} className="border border-zinc-200 bg-white p-5">
            <p className="text-sm font-medium text-zinc-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-zinc-950">{value}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden border border-zinc-200 bg-white">
        <div className="border-b border-zinc-200 p-5">
          <h2 className="text-xl font-bold text-zinc-950">Recent Posts</h2>
        </div>
        <div className="divide-y divide-zinc-200">
          {articles.map((article) => (
            <article key={article.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={article.status} />
                  <span className="text-sm text-zinc-500">{article.category.name}</span>
                  <span className="text-sm text-zinc-500">{formatDate(article.updatedAt)}</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-zinc-950">{article.title}</h3>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-zinc-600">{article.summary}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={`/admin/articles/${article.id}/edit`} className="border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-700">Edit</Link>
                {article.status === "published" ? (
                  <button type="button" onClick={() => updateStatus(article.id, "draft")} className="border border-amber-300 px-3 py-2 text-sm font-semibold text-amber-800">
                    Unpublish
                  </button>
                ) : (
                  <button type="button" onClick={() => updateStatus(article.id, "published")} className="border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800">
                    Publish
                  </button>
                )}
                <button type="button" onClick={() => removeArticle(article.id)} className="border border-red-200 px-3 py-2 text-sm font-semibold text-red-700">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
