"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { categories } from "@/lib/articles";
import { isAdminAuthenticated, loadArticles, saveArticles } from "@/lib/admin-storage";
import type { Article } from "@/types/article";

const fallbackImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

export function ArticleEditor({ articleId }: { articleId?: string }) {
  const [articles] = useState<Article[]>(() => (typeof window === "undefined" ? [] : loadArticles()));
  const article = useMemo(() => articles.find((item) => item.id === articleId), [articleId, articles]);

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      window.location.href = "/admin/login";
    }
  }, []);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const category = categories.find((item) => item.slug === String(form.get("categorySlug"))) || categories[0];
    const now = new Date().toISOString();
    const id = article?.id || String(Date.now());
    const status = String(form.get("status")) === "published" ? "published" : "draft";
    const nextArticle: Article = {
      id,
      title: String(form.get("title") || "Untitled article"),
      slug: String(form.get("slug") || "untitled-article").toLowerCase().replaceAll(" ", "-"),
      summary: String(form.get("summary") || ""),
      content: String(form.get("content") || "").split("\n").map((line) => line.trim()).filter(Boolean),
      coverImageUrl: String(form.get("coverImageUrl") || fallbackImage),
      status,
      author: String(form.get("author") || "PhilWatch Desk"),
      category,
      tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
      sources: String(form.get("sources") || "").split("\n").map((line) => line.trim()).filter(Boolean).map((url, index) => ({ name: `Source ${index + 1}`, url })),
      seoTitle: String(form.get("seoTitle") || form.get("title") || ""),
      seoDescription: String(form.get("seoDescription") || form.get("summary") || ""),
      publishedAt: status === "published" ? article?.publishedAt || now : article?.publishedAt || now,
      createdAt: article?.createdAt || now,
      updatedAt: now,
    };

    const next = article ? articles.map((item) => (item.id === article.id ? nextArticle : item)) : [nextArticle, ...articles];
    saveArticles(next);
    window.location.href = "/admin";
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="border-b border-zinc-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Article Editor</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">{article ? "Edit Article" : "Create Article"}</h1>
      </div>
      <form onSubmit={onSubmit} className="grid gap-5 py-6">
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Title
          <input name="title" defaultValue={article?.title} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Slug
          <input name="slug" defaultValue={article?.slug} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Summary
          <textarea name="summary" defaultValue={article?.summary} rows={3} className="border border-zinc-300 p-3 text-base text-zinc-950" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Content
          <textarea name="content" defaultValue={article?.content.join("\n\n")} rows={12} className="border border-zinc-300 p-3 text-base leading-7 text-zinc-950" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Category
            <select name="categorySlug" defaultValue={article?.category.slug || categories[0].slug} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950">
              {categories.map((category) => (
                <option key={category.slug} value={category.slug}>{category.name}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Status
            <select name="status" defaultValue={article?.status || "draft"} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Author
            <input name="author" defaultValue={article?.author || "PhilWatch Desk"} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Tags
            <input name="tags" defaultValue={article?.tags.join(", ")} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Cover image URL
          <input name="coverImageUrl" defaultValue={article?.coverImageUrl || fallbackImage} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Source URLs
          <textarea name="sources" defaultValue={article?.sources.map((source) => source.url).join("\n")} rows={3} className="border border-zinc-300 p-3 text-base text-zinc-950" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            SEO title
            <input name="seoTitle" defaultValue={article?.seoTitle} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
          </label>
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            SEO description
            <input name="seoDescription" defaultValue={article?.seoDescription} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
          </label>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700">Save Article</button>
          <a href="/admin" className="border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700">Cancel</a>
        </div>
      </form>
    </main>
  );
}
