import type { Article } from "@/types/article";

export const DEFAULT_ARTICLE_IMAGE =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80";

export function getArticleImageUrl(article?: Pick<Article, "coverImageUrl" | "img"> | null) {
  const rawUrl = (article?.coverImageUrl || article?.img || "").trim();

  if (!rawUrl) return DEFAULT_ARTICLE_IMAGE;
  if (rawUrl.startsWith("/")) return rawUrl;
  if (rawUrl.startsWith("//")) return `https:${rawUrl}`;
  if (/^www\./i.test(rawUrl)) return `https://${rawUrl}`;

  try {
    const url = new URL(rawUrl);
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.toString();
    }
  } catch {
    return DEFAULT_ARTICLE_IMAGE;
  }

  return DEFAULT_ARTICLE_IMAGE;
}

export function articleParagraphs(content: Article["content"]) {
  return Array.isArray(content)
    ? content
    : content
        .split(/\n{2,}/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}
