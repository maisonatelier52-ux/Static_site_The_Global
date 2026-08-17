// Article and author content now lives in /public/data (articles.json, authors.json),
// mirroring the OS-Intel data layout. This module adapts that JSON into the flat
// shape the rest of the app already expects, so components don't need to change.
import articlesByCategory from "../public/data/articles.json" with { type: "json" };
import authorsData from "../public/data/authors.json" with { type: "json" };

export const authors = authorsData.authors;

function parseDdMmYyyy(value) {
  const [d, m, y] = value.split("/");
  return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
}

// Rebuild the "sections" shape (id/heading/blocks) that the article page
// renders, from the JSON "content" block array. Each section keeps its
// paragraphs and images in the exact order they appear in the source JSON,
// so a section can contain any number of images interleaved with text.
function sectionsFromContent(content) {
  const sections = [];
  let current = null;

  const slugifyHeading = (text) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  for (const block of content) {
    if (block.type === "heading") {
      current = { id: slugifyHeading(block.text), heading: block.text, blocks: [] };
      sections.push(current);
    } else if (block.type === "paragraph") {
      if (!current) {
        current = { id: `section-${sections.length + 1}`, heading: "", blocks: [] };
        sections.push(current);
      }
      current.blocks.push({ type: "paragraph", text: block.text });
    } else if (block.type === "image") {
      if (!current) {
        current = { id: `section-${sections.length + 1}`, heading: "", blocks: [] };
        sections.push(current);
      }
      current.blocks.push({
        type: "image",
        src: block.src,
        alt: block.alt || "",
        caption: block.caption || "",
      });
    }
    // "quote" blocks are not part of sections — the article page renders
    // article.quote separately after the first section.
  }

  return sections;
}

function buildArticles() {
  const all = [];
  for (const [category, items] of Object.entries(articlesByCategory)) {
    for (const item of items) {
      const publishedAt = parseDdMmYyyy(item.date).toISOString();
      all.push({
        id: item.id,
        slug: item.slug,
        title: item.title,
        category: item.category,
        summary: item.excerpt,
        image: item.image,
        imageAlt: item.imageAlt,
        authorSlug: item.authorSlug,
        publishedAt,
        readTime: item.readTime,
        eyebrow: item.eyebrow,
        keyTakeaways: item.keyTakeaways,
        quote: item.quote,
        keywords: item.keywords,
        metaTitle: item.metaTitle,
        metaDescription: item.metaDescription,
        sections: sectionsFromContent(item.content),
      });
    }
  }
  // Newest first, matching the original hand-authored ordering.
  return all.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

export const articles = buildArticles();

export const categories = Array.from(new Set(articles.map((article) => article.category)));

export function getArticle(category, slug) {
  return articles.find(
    (article) => article.category === category.toLowerCase() && article.slug === slug,
  );
}

export function getAuthor(slug) {
  return authors.find((author) => author.slug === slug);
}

// Returns the article immediately before/after the given article in the
// global, newest-first `articles` list, so the article page can link to a
// "previous" and "next" story. Either side can be null at the ends of the
// list — callers should handle that (e.g. hide the missing side).
export function getAdjacentArticles(article) {
  const index = articles.findIndex((item) => item.id === article.id);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: index + 1 < articles.length ? articles[index + 1] : null,
    next: index - 1 >= 0 ? articles[index - 1] : null,
  };
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function categoryLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function timeAgo(value) {
  const days = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 86400000));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  return `${days} days ago`;
}