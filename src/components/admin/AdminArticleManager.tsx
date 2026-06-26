"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/articles";
import { adminApi } from "@/lib/api";
import type { Article } from "@/types/article";

export function AdminArticleManager() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState({ published: 0, drafts: 0, total: 0 });
  const [error, setError] = useState("");

  useEffect(() => {
    void loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      await adminApi.me();
      const [dashboard, articleResult] = await Promise.all([
        adminApi.dashboard(),
        adminApi.articles(),
      ]);
      setArticles(articleResult.data);
      setStats({
        published: dashboard.publishedArticles,
        drafts: dashboard.draftArticles,
        total: articleResult.meta.total,
      });
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      window.location.href = "/admin/login";
    }
  }

  async function updateStatus(id: number | string, status: Article["status"]) {
    if (status === "published") {
      await adminApi.publishArticle(id);
    } else {
      await adminApi.unpublishArticle(id);
    }
    await loadDashboard();
  }

  async function removeArticle(id: number | string) {
    await adminApi.deleteArticle(id);
    await loadDashboard();
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
          <Link href="/admin/source-inbox" className="border border-emerald-300 px-4 py-3 text-sm font-semibold text-emerald-800">Source Inbox</Link>
          <button
            type="button"
            onClick={async () => {
              await adminApi.logout();
              window.location.href = "/";
            }}
            className="border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700"
          >
            Log out
          </button>
        </div>
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

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
          <h2 className="text-xl font-bold text-zinc-950">All Posts</h2>
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
