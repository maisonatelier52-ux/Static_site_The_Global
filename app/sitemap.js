import { articles, authors, categories } from "@/data/news";
import { siteConfig } from "@/lib/site";

export default function sitemap() {
  const staticPages = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];
  const categoryPages = categories.map((category) => ({
    url: `${siteConfig.url}/${category}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
  const articlePages = articles.map((article) => ({
    url: `${siteConfig.url}/${article.category}/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const authorPages = authors.map((author) => ({
    url: `${siteConfig.url}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
  return [...staticPages, ...categoryPages, ...articlePages, ...authorPages];
}
