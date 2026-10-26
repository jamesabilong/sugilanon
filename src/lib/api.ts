import type { Article, Category, Paginated, SourceDraft } from "@/types/article";

type RequestOptions = RequestInit;

const publicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";


async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { headers, ...rest } = options;
  const response = await fetch(`${publicApiBase.replace(/\/$/, "")}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    ...rest,
  });

  if (!response.ok) {
    let message = `Request failed with ${response.status}`;
    try {
      const body = await response.json();
      message = body.message || message;
    } catch {
      // Keep the HTTP fallback message.
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const adminApi = {
  login: (username: string, password: string) =>
    request<{ user: { id: number; username: string; email: string; role: number } }>("/platform/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  me: () =>
    request<{ user: { id: number; username: string; email: string; role: number } }>("/platform/auth/me", {
      cache: "no-store",
    }),
  logout: () => request<void>("/platform/auth/logout", { method: "POST" }),
  dashboard: () =>
    request<{ publishedArticles: number; draftArticles: number; recentPosts: Article[] }>(
      "/sugilanon/admin/dashboard",
      { cache: "no-store" },
    ),
  categories: () => request<Category[]>("/sugilanon/categories", { cache: "no-store" }),
  articles: () => request<Paginated<Article>>("/sugilanon/admin/articles?limit=100", { cache: "no-store" }),
  article: (id: string) => request<Article>(`/sugilanon/admin/articles/${id}`, { cache: "no-store" }),
  createArticle: (payload: unknown) =>
    request<Article>("/sugilanon/admin/articles", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateArticle: (id: string, payload: unknown) =>
    request<Article>(`/sugilanon/admin/articles/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteArticle: (id: number | string) =>
    request<void>(`/sugilanon/admin/articles/${id}`, {
      method: "DELETE",
    }),
  publishArticle: (id: number | string) =>
    request<Article>(`/sugilanon/admin/articles/${id}/publish`, {
      method: "PATCH",
    }),
  unpublishArticle: (id: number | string) =>
    request<Article>(`/sugilanon/admin/articles/${id}/unpublish`, {
      method: "PATCH",
    }),
  sourceDrafts: () =>
    request<Paginated<SourceDraft>>("/sugilanon/admin/source-drafts?limit=100", {
      cache: "no-store",
    }),
  scanSources: () =>
    request<{ scannedAt: string; results: Array<{ sourceId: string; agency: string; status: string; created: number; found?: number; message?: string }> }>(
      "/sugilanon/admin/source-scan",
      { method: "POST" },
    ),
  ignoreSourceDraft: (id: number | string) =>
    request<SourceDraft>(`/sugilanon/admin/source-drafts/${id}/ignore`, {
      method: "PATCH",
    }),
  convertSourceDraft: (id: number | string) =>
    request<{ draft: SourceDraft; article: Article }>(`/sugilanon/admin/source-drafts/${id}/convert`, {
      method: "POST",
    }),
};
