export type ArticleStatus = "draft" | "published";

export type Category = {
  name: string;
  slug: string;
  description: string;
};

export type SourceLink = {
  name: string;
  url: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string[];
  coverImageUrl: string;
  status: ArticleStatus;
  author: string;
  category: Category;
  tags: string[];
  sources: SourceLink[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};
