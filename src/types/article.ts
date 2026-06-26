export type ArticleStatus = "draft" | "published";

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
};

export type SourceLink = {
  id?: number;
  sourceName: string;
  sourceUrl: string;
};

export type Tag = {
  id?: number;
  name: string;
  slug?: string;
};

export type Author = {
  id: number;
  username: string;
};

export type Article = {
  id: number | string;
  title: string;
  slug: string;
  summary: string;
  content: string | string[];
  coverImageUrl: string | null;
  img: string | null;
  status: ArticleStatus;
  author: Author | null;
  category: Category;
  tags: Tag[];
  sources: SourceLink[];
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
};

export type SourceDraftStatus = "new" | "converted" | "ignored";

export type SourceDraft = {
  id: number;
  sourceId: string;
  agency: string;
  title: string;
  sourceUrl: string;
  summary: string | null;
  rawExcerpt: string | null;
  status: SourceDraftStatus;
  detectedAt: string;
  createdAt: string;
  updatedAt: string;
  category: Category | null;
  article: Pick<Article, "id" | "title" | "slug" | "status"> | null;
};

export type EarthquakeItem = {
  id: string;
  title: string;
  sourceUrl: string;
  dateTime: string | null;
  latitude: string | null;
  longitude: string | null;
  depthKm: string | null;
  magnitude: string | null;
  location: string | null;
  summary: string;
};

export type EarthquakeFeed = {
  source: {
    name: string;
    url: string;
  };
  fetchedAt: string;
  data: EarthquakeItem[];
};

export type Paginated<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
