import type { Article, Category } from "@/types/article";

export const categories: Category[] = [
  { id: 1, name: "Cebu News", slug: "cebu-news", description: "Local updates, public advisories, and community developments across Cebu." },
  { id: 2, name: "Philippine News", slug: "philippine-news", description: "National stories summarized for readers who want the useful details first." },
  { id: 3, name: "Community", slug: "community", description: "People, groups, events, and initiatives shaping local life." },
  { id: 4, name: "Guides", slug: "guides", description: "Practical explainers for public services, local errands, and everyday planning." },
  { id: 5, name: "Local Business", slug: "local-business", description: "Small business news, market notes, and neighborhood commerce." },
  { id: 6, name: "Weather and Emergency Updates", slug: "weather-emergency-updates", description: "Preparedness notes and verified public safety reminders." },
  { id: 7, name: "Opinion", slug: "opinion", description: "Clearly labeled perspectives on local issues and civic life." },
  { id: 8, name: "Technology", slug: "technology", description: "Digital tools, internet access, public tech, and practical apps." },
];

const image = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const seededArticles: Article[] = [
  {
    id: "1",
    title: "Cebu City Opens New Weekend Processing Desk for Local Permits",
    slug: "cebu-city-weekend-processing-desk-local-permits",
    summary: "A quick guide to the new weekend desk, what residents can prepare, and where to verify schedules before visiting.",
    content: [
      "Cebu City residents now have another option for selected permit-related transactions through a weekend processing desk announced for high-demand periods.",
      "The service is intended to reduce weekday congestion and help workers who cannot easily visit city offices during regular hours. Residents should still confirm the latest schedule before going, because covered transactions may change by office or date.",
      "Bring a valid ID, printed supporting documents, and a copy of any prior application reference number. For renewals, prepare both the previous permit and proof of payment when applicable.",
      "PhilWatch will update this article when the city publishes a longer transaction list or a revised schedule.",
    ],
    coverImageUrl: image("1518005020951-eccb494ad742"),
    status: "published",
    author: { id: 1, username: "PhilWatch Desk" },
    category: categories[0],
    tags: [{ name: "Cebu" }, { name: "Permits" }, { name: "Public Service" }],
    sources: [{ sourceName: "Cebu City Public Information Office", sourceUrl: "https://cebucity.gov.ph/" }],
    seoTitle: "Cebu City Weekend Permit Processing Desk",
    seoDescription: "What Cebu residents should know about weekend local permit processing.",
    publishedAt: "2026-06-22T08:00:00.000Z",
    createdAt: "2026-06-22T07:30:00.000Z",
    updatedAt: "2026-06-22T08:00:00.000Z",
  },
  {
    id: "2",
    title: "What To Pack Before a Heavy Rain Advisory in Central Visayas",
    slug: "heavy-rain-advisory-central-visayas-packing-guide",
    summary: "A practical checklist for families preparing for heavy rain, flooding, and short power interruptions.",
    content: [
      "Heavy rain advisories are easier to handle when families prepare before streets become difficult to pass. Start with drinking water, ready-to-eat food, medicine, flashlights, charged power banks, and copies of important documents.",
      "Keep emergency items in a waterproof bag and place it where everyone in the household can find it. Families with children, seniors, or pets should prepare their needs separately.",
      "Follow official advisories from weather agencies and local disaster offices. Avoid resharing unverified flood photos or old warnings without checking the date and source.",
    ],
    coverImageUrl: image("1500530855697-b586d89ba3ee"),
    status: "published",
    author: { id: 2, username: "Mara Santos" },
    category: categories[5],
    tags: [{ name: "Weather" }, { name: "Emergency" }, { name: "Preparedness" }],
    sources: [{ sourceName: "PAGASA", sourceUrl: "https://www.pagasa.dost.gov.ph/" }],
    seoTitle: "Central Visayas Heavy Rain Preparedness Checklist",
    seoDescription: "What to prepare before heavy rain advisories in Central Visayas.",
    publishedAt: "2026-06-21T10:15:00.000Z",
    createdAt: "2026-06-21T09:45:00.000Z",
    updatedAt: "2026-06-21T10:15:00.000Z",
  },
  {
    id: "3",
    title: "How Barangay Announcements Can Reach More Residents Online",
    slug: "barangay-announcements-reach-residents-online",
    summary: "Simple publishing practices that make public notices easier to find, understand, and share responsibly.",
    content: [
      "Barangay announcements are most useful when residents can quickly confirm what happened, who is affected, and what action is needed.",
      "Clear titles, readable graphics, alt text, and short summaries help residents scan updates on mobile phones. Posts should include the date, contact office, location, and a direct link to the original notice when available.",
      "For urgent notices, avoid burying the instruction in long captions. Put the action first, then explain context below it.",
    ],
    coverImageUrl: image("1497366754035-f200968a6e72"),
    status: "published",
    author: { id: 1, username: "PhilWatch Desk" },
    category: categories[2],
    tags: [{ name: "Barangay" }, { name: "Community" }, { name: "Digital" }],
    sources: [],
    seoTitle: "Better Online Barangay Announcements",
    seoDescription: "Publishing tips for clear and useful barangay announcements.",
    publishedAt: "2026-06-19T13:00:00.000Z",
    createdAt: "2026-06-19T12:30:00.000Z",
    updatedAt: "2026-06-19T13:00:00.000Z",
  },
  {
    id: "4",
    title: "A First-Time Applicant Guide to Common Philippine IDs",
    slug: "first-time-applicant-guide-common-philippine-ids",
    summary: "A reader-friendly overview of common ID application steps and the documents usually requested.",
    content: [
      "First-time applicants should start by checking the official website of the issuing agency, because documentary requirements vary by age, employment status, and existing records.",
      "Most applications require a birth certificate or another primary identity document, a completed form, and proof of address or appointment confirmation. Bring photocopies and keep digital copies for backup.",
      "Avoid fixers and unofficial processing offers. If a fee is required, pay only through channels listed by the agency.",
    ],
    coverImageUrl: image("1554224155-6726b3ff858f"),
    status: "published",
    author: { id: 3, username: "Rico Mendoza" },
    category: categories[3],
    tags: [{ name: "Government IDs" }, { name: "Guide" }, { name: "Documents" }],
    sources: [],
    seoTitle: "Common Philippine ID Application Guide",
    seoDescription: "Documents and reminders for first-time Philippine ID applicants.",
    publishedAt: "2026-06-18T07:15:00.000Z",
    createdAt: "2026-06-18T06:55:00.000Z",
    updatedAt: "2026-06-18T07:15:00.000Z",
  },
  {
    id: "5",
    title: "Local Cafes Use Delivery Groups to Keep Neighborhood Sales Moving",
    slug: "local-cafes-delivery-groups-neighborhood-sales",
    summary: "Small food businesses are using group chats, community pages, and scheduled drops to reach nearby customers.",
    content: [
      "Neighborhood cafes are leaning on local delivery groups and community pages to handle small-batch orders without depending entirely on large platforms.",
      "The model works best when menus are clear, cut-off times are consistent, and payment instructions are easy to verify. Customers benefit from lower delivery distances and more direct communication.",
      "Business owners should keep records of orders and publish refund or replacement rules to avoid confusion during busy days.",
    ],
    coverImageUrl: image("1501339847302-ac426a4a7cbb"),
    status: "published",
    author: { id: 4, username: "Lea Villanueva" },
    category: categories[4],
    tags: [{ name: "Small Business" }, { name: "Food" }, { name: "Delivery" }],
    sources: [],
    seoTitle: "Local Cafe Delivery Groups in Cebu",
    seoDescription: "How small cafes use community delivery groups for neighborhood sales.",
    publishedAt: "2026-06-16T11:30:00.000Z",
    createdAt: "2026-06-16T11:00:00.000Z",
    updatedAt: "2026-06-16T11:30:00.000Z",
  },
];

export function getPublishedArticles(articles = seededArticles) {
  return articles
    .filter((article) => article.status === "published")
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
}

export function findArticleBySlug(slug: string) {
  return seededArticles.find((article) => article.slug === slug && article.status === "published");
}

export function findCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getArticlesByCategory(slug: string) {
  return getPublishedArticles().filter((article) => article.category.slug === slug);
}

export function searchArticles(query: string, articles = seededArticles) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return getPublishedArticles(articles);
  }

  return getPublishedArticles(articles).filter((article) => {
    const content = Array.isArray(article.content) ? article.content.join(" ") : article.content;
    const haystack = [article.title, article.summary, content, article.category.name, article.tags.map((tag) => tag.name).join(" ")]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
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
