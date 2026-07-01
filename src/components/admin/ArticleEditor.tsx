"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";

import { articleParagraphs } from "@/lib/articles";
import { adminApi } from "@/lib/api";
import type { Article, Category } from "@/types/article";

export function ArticleEditor({ articleId }: { articleId?: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const selectedCategoryId = useMemo(() => article?.category.id || categories[0]?.id, [article, categories]);

  const loadEditor = useCallback(async () => {
    try {
      await adminApi.me();
      const loadedCategories = await adminApi.categories();
      setCategories(loadedCategories);
      if (articleId) {
        setArticle(await adminApi.article(articleId));
      }
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      window.location.href = "/admin/login";
    }
  }, [articleId]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadEditor();
  }, [loadEditor]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const status = String(form.get("status")) === "published" ? "published" : "draft";
    const payload = {
      title: String(form.get("title") || "Untitled article"),
      slug: String(form.get("slug") || "untitled-article").toLowerCase().replaceAll(" ", "-"),
      summary: String(form.get("summary") || ""),
      content: String(form.get("content") || ""),
      coverImageUrl: String(form.get("coverImageUrl") || "") || null,
      status,
      categoryId: Number(form.get("categoryId") || selectedCategoryId),
      tags: String(form.get("tags") || "").split(",").map((tag) => tag.trim()).filter(Boolean),
      sources: String(form.get("sources") || "").split("\n").map((line) => line.trim()).filter(Boolean).map((url, index) => ({ sourceName: `Source ${index + 1}`, sourceUrl: url })),
      seoTitle: String(form.get("seoTitle") || form.get("title") || ""),
      seoDescription: String(form.get("seoDescription") || form.get("summary") || ""),
    };

    try {
      if (articleId) {
        await adminApi.updateArticle(articleId, payload);
      } else {
        await adminApi.createArticle(payload);
      }
      window.location.href = "/admin";
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to save article.");
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="border-b border-zinc-200 pb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Article Editor</p>
        <h1 className="mt-2 text-3xl font-bold text-zinc-950">{article ? "Edit Article" : "Create Article"}</h1>
      </div>
      {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}
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
          <textarea name="content" defaultValue={article ? articleParagraphs(article.content).join("\n\n") : ""} rows={12} className="border border-zinc-300 p-3 text-base leading-7 text-zinc-950" />
        </label>
        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2 text-sm font-medium text-zinc-700">
            Category
            <select name="categoryId" defaultValue={selectedCategoryId} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
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
            Tags
            <input name="tags" defaultValue={article?.tags.map((tag) => tag.name).join(", ")} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
          </label>
        </div>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Cover image URL
          <input name="coverImageUrl" defaultValue={article?.coverImageUrl || ""} className="min-h-12 border border-zinc-300 px-3 text-base text-zinc-950" />
        </label>
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Source URLs
          <textarea name="sources" defaultValue={article?.sources.map((source) => source.sourceUrl).join("\n")} rows={3} className="border border-zinc-300 p-3 text-base text-zinc-950" />
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
