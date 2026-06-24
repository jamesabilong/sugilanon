"use client";

import { seededArticles } from "@/lib/articles";
import type { Article } from "@/types/article";

const articlesKey = "philwatch_articles";
const authKey = "philwatch_admin_authenticated";

export function isAdminAuthenticated() {
  return window.localStorage.getItem(authKey) === "true";
}

export function setAdminAuthenticated(value: boolean) {
  window.localStorage.setItem(authKey, value ? "true" : "false");
}

export function loadArticles() {
  const stored = window.localStorage.getItem(articlesKey);

  if (!stored) {
    window.localStorage.setItem(articlesKey, JSON.stringify(seededArticles));
    return seededArticles;
  }

  try {
    return JSON.parse(stored) as Article[];
  } catch {
    window.localStorage.setItem(articlesKey, JSON.stringify(seededArticles));
    return seededArticles;
  }
}

export function saveArticles(articles: Article[]) {
  window.localStorage.setItem(articlesKey, JSON.stringify(articles));
}
