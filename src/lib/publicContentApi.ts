import "server-only";
import type { Article, Category, EarthquakeFeed, Paginated } from "@/types/article";
import { searchQueryLength } from "./searchQuery";

type RequestOptions = RequestInit & {
  useInternalBase?: boolean;
};

const publicApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";
const internalApiBase = process.env.CONTENT_API_BASE_URL || publicApiBase;

const apiBase = (useInternalBase = false) =>
  (useInternalBase ? internalApiBase : publicApiBase).replace(/\/$/, "");

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { useInternalBase = false, headers, ...rest } = options;
  if (useInternalBase && typeof window !== "undefined") throw new Error("Internal content reads are server-only");
  const serviceHeaders = useInternalBase
    ? (await import("@/lib/internalContentHeaders")).internalContentHeaders()
    : {};
  const response = await fetch(`${apiBase(useInternalBase)}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...headers,
      ...serviceHeaders,
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

export async function fetchPublishedArticles(params = "", useInternalBase = true) {
	try {
		const result = await request<Paginated<Article>>(`/sugilanon/articles${params}`, {
			cache: "no-store",
			useInternalBase,
		});
		return result.data;
	} catch {
		return [];
	}
}

export async function fetchArticleBySlug(slug: string) {
	try {
		return await request<Article>(`/sugilanon/articles/${encodeURIComponent(slug)}`, {
			cache: "no-store",
			useInternalBase: true,
		});
	} catch {
		return null;
	}
}

export async function fetchCategories(useInternalBase = true) {
	try {
		const categories = await request<Category[]>("/sugilanon/categories", {
			cache: "no-store",
			useInternalBase,
		});
		return categories;
	} catch {
		return [];
	}
}

export async function fetchCategoryArticles(slug: string) {
	try {
		const result = await request<Paginated<Article>>(`/sugilanon/categories/${encodeURIComponent(slug)}/articles`, {
			cache: "no-store",
			useInternalBase: true,
		});
		return result.data;
	} catch {
		return [];
	}
}

export async function searchBackendArticles(query: string, page = 1) {
  const search = new URLSearchParams({ page: String(page) });
  if (searchQueryLength(query)) search.set("q", query);
  return request<Paginated<Article>>(`/sugilanon/search?${search}`, {
    cache: "no-store",
    useInternalBase: true,
  });
}

export async function fetchLatestEarthquakes() {
  try {
    return await request<EarthquakeFeed>("/sugilanon/earthquakes/latest", {
      cache: "no-store",
      useInternalBase: true,
    });
  } catch {
    return null;
  }
}
