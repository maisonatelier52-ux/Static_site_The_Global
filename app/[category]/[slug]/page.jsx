
import Link from "next/link";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/Newsletter";
import { ShareRow } from "@/components/ShareRow";
import { SocialIcon } from "@/components/SocialIcon";
import { ArticleNav } from "@/components/ArticleNav";
import { articles, categoryLabel, formatDate, getAdjacentArticles, getArticle, getAuthor, timeAgo } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ category: article.category, slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) return {};
  const url = `${siteConfig.url}/${article.category}/${article.slug}`;
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: url },
    authors: [{ name: getAuthor(article.authorSlug)?.name || siteConfig.name }],
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url,
      images: [{ url: article.image, alt: article.imageAlt }],
      publishedTime: article.publishedAt,
      section: categoryLabel(article.category),
    },
    twitter: { card: "summary_large_image", title: article.title, description: article.summary, images: [article.image] },
  };
}

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const CATEGORY_LABEL = `inline-block font-extrabold text-[11px] ${SANS} tracking-[.1em] uppercase text-[#7a1f2b]`;
const CARD = "bg-[#f7f5f2] border border-[#e5e0d8] p-[20px] rounded-none [&>h2]:m-0 [&>h2]:mb-[14px] [&>h2]:pb-[12px] [&>h2]:font-['Georgia','Times_New_Roman',serif] [&>h2]:font-bold [&>h2]:text-[15px] [&>h2]:tracking-[.02em] [&>h2]:uppercase [&>h2]:text-[#1a1a1a] [&>h2]:border-b-2 [&>h2]:border-[#7a1f2b] [&>h2]:flex [&>h2]:items-center [&>h2]:gap-[8px]";

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(category, slug);
  if (!article) notFound();
  const author = getAuthor(article.authorSlug);
  if (!author) notFound();
  const canonicalUrl = `${siteConfig.url}/${article.category}/${article.slug}`;
  const mostRead = articles.filter((item) => item.id !== article.id).slice(0, 5);
  const related = articles.filter((item) => item.category === article.category && item.id !== article.id).slice(0, 4);
  const { previous, next } = getAdjacentArticles(article);
  const label = categoryLabel(article.category);
  const tags = Array.from(new Set([label, article.eyebrow]));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [`${siteConfig.url}${article.image}`],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Person", name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
    publisher: { "@type": "NewsMediaOrganization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <main id="main-content" className="bg-white [&_h1]:font-['Georgia','Times_New_Roman',serif] [&_h1]:text-[#1a1a1a] [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[#1a1a1a] [&_h3]:font-['Georgia','Times_New_Roman',serif] [&_h3]:text-[#1a1a1a] px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

     

      <div className={`${SHELL} grid grid-cols-[280px_minmax(0,760px)] max-[900px]:grid-cols-1 gap-[48px] items-start py-[40px] pb-[56px]`}>
        <aside className="flex flex-col gap-[22px] sticky top-[18px] max-[900px]:static max-[900px]:order-2">
          <div className={CARD}>
            <h2>Most Read</h2>
            <ol className="list-none m-0 p-0 flex flex-col">
              {mostRead.map((item, index) => (
                <li key={item.id} className="grid grid-cols-[30px_1fr] gap-[10px] py-[11px] border-b border-[#e5e0d8] last:border-b-0 last:pb-0">
                  <span className={`text-[#d8cfc6] font-bold ${SERIF} text-[22px] leading-none`}>{String(index + 1).padStart(2, "0")}</span>
                  <Link href={`/${item.category}/${item.slug}`} className={`text-[13px] leading-[1.35] ${SANS} text-[#1a1a1a] hover:text-[#7a1f2b]`}>{item.title}</Link>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="min-w-0 max-[900px]:order-1">
           <div className={SHELL}>
        <nav className="flex flex-wrap gap-[8px] items-center text-[#6b6b6b] text-[12.5px] pt-[26px] [&>a:hover]:text-[#7a1f2b] [&>span:last-child]:text-[#1a1a1a] [&>span:last-child]:overflow-hidden [&>span:last-child]:text-ellipsis [&>span:last-child]:whitespace-nowrap [&>span:last-child]:max-w-[45vw]" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${article.category}`}>{label}</Link>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        <div className="mt-[16px]">
          <span className={CATEGORY_LABEL}>{label}</span>
          <h1 className="my-[10px] mb-[14px] font-bold text-[clamp(24px,3.4vw,34px)] max-[480px]:text-[27px] leading-[1.15] tracking-[-.01em]">{article.title}</h1>
          <p className={`m-0 text-[#6b6b6b] ${SANS} text-[13px] leading-[1.55]`}>{article.summary}</p>
        </div>

        <div className="flex flex-wrap max-[640px]:flex-col max-[640px]:items-start items-center justify-between gap-[18px] mt-[26px] py-[18px] border-t border-b border-[#e5e0d8]">
          <div className="flex items-center gap-[12px]">
            <Link href={`/author/${author.slug}`} className="block w-[48px] h-[48px] rounded-full overflow-hidden flex-none [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
              <img src={author.image} alt={author.name} />
            </Link>
            <div>
              <span className={`font-bold text-[13px] ${SANS} text-[#1a1a1a] [&_a:hover]:text-[#7a1f2b]`}>By <Link href={`/author/${author.slug}`}>{author.name}</Link></span>
              <small className="block mt-[3px] text-[#6b6b6b] text-[11.5px]">{formatDate(article.publishedAt)} · {article.readTime}</small>
            </div>
          </div>
          <ShareRow title={article.title} url={canonicalUrl} />
        </div>
       
      </div>
           <figure className="mt-[28px]">
          <img src={article.image} alt={article.imageAlt} className="w-full h-[200px] md:h-[400px] aspect-video object-fit" />
          <figcaption className="mt-[9px] text-[#6b6b6b] text-[12px]">{article.imageAlt}</figcaption>
        </figure>
          {article.sections.map((section, index) => (
            <section id={section.id} key={section.id} className="scroll-mt-[90px]">
              {section.heading && (
                <h2 className="mt-[36px] mb-[14px] font-bold text-[1.2rem] leading-[1.3]">{section.heading}</h2>
              )}
              {section.blocks.map((block, blockIndex) =>
                block.type === "paragraph" ? (
                  <p key={`p-${blockIndex}`} className={`m-0 mb-[16px] text-[#2a2a2a] ${SANS} text-[14.5px] leading-[1.75]`}>{block.text}</p>
                ) : (
                  <figure key={`i-${blockIndex}`} className="my-[26px]">
                    <img src={block.src} alt={block.alt || "Article supporting image"} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                    {block.caption && <figcaption className="mt-[9px] text-[#6b6b6b] text-[12px]">{block.caption}</figcaption>}
                  </figure>
                ),
              )}
              {index === 0 && (
                <blockquote className="relative my-[30px] px-[24px] pt-[24px] pb-[20px] border-l-4 border-[#7a1f2b] bg-[#f7f5f2]">
                  <span className={`block font-bold ${SERIF} text-[48px] leading-none text-[#7a1f2b]/25 -mb-[4px]`} aria-hidden="true">&ldquo;</span>
                  <p className={`m-0 text-[#1a1a1a] italic font-semibold ${SERIF} text-[18px] leading-[1.4]`}>{article.quote}</p>
                  <cite className={`block mt-[12px] text-[#6b6b6b] text-[11.5px] ${SANS} not-italic before:content-['—_']`}>{author.name}, {author.role}</cite>
                </blockquote>
              )}
            </section>
          ))}

          <div className="flex flex-wrap gap-[9px] mt-[30px]">
            {tags.map((tag) => (
              <span key={tag} className="bg-[#f7f5f2] border border-[#e5e0d8] text-[#6b6b6b] text-[11px] px-[13px] py-[7px]">{tag}</span>
            ))}
          </div>

          <div className="mt-[20px]">
            <ShareRow title={article.title} url={canonicalUrl} />
          </div>
          <hr className="border-0 border-t border-[#e5e0d8] my-[26px] mb-[34px]" />

          <section className="grid grid-cols-[80px_1fr] max-[640px]:grid-cols-1 gap-[22px] items-start bg-[#f7f5f2] border border-[#e5e0d8] p-[26px]">
            <Link href={`/author/${author.slug}`} className="block w-[80px] h-[80px] rounded-full overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
              <img src={author.image} alt={author.name} />
            </Link>
            <div>
              <span className={`block text-[#6b6b6b] font-extrabold text-[10.5px] ${SANS} tracking-[.12em] uppercase`}>Written by</span>
              <h3 className={`mt-[7px] mb-[2px] font-bold ${SERIF} text-[18px] [&_a:hover]:text-[#7a1f2b]`}><Link href={`/author/${author.slug}`}>{author.name}</Link></h3>
              <p className={`m-0 mb-[10px] text-[#7a1f2b] font-bold text-[11.5px] ${SANS}`}>{author.role}</p>
              <p className={`m-0 mb-[14px] text-[#6b6b6b] text-[13.5px] leading-[1.6] ${SANS}`}>{author.bio}</p>
              <div className="flex gap-[10px]">
                <a href={author.social.x} aria-label={`${author.name} on X`} className="grid place-items-center w-[32px] h-[32px] rounded-full text-[#7a1f2b] border border-[#e5e0d8] hover:bg-[#7a1f2b] hover:text-white hover:border-[#7a1f2b]"><SocialIcon name="x" size={15} /></a>
                <a href={author.social.linkedin} aria-label={`${author.name} on LinkedIn`} className="grid place-items-center w-[32px] h-[32px] rounded-full text-[#7a1f2b] border border-[#e5e0d8] hover:bg-[#7a1f2b] hover:text-white hover:border-[#7a1f2b]"><SocialIcon name="linkedin" size={15} /></a>
              </div>
            </div>
          </section>

          <div className="mt-[26px]">
            <ArticleNav previous={previous} next={next} />
          </div>
        </article>
      </div>

      <section className={`${SHELL} pt-[12px] pb-[56px]`}>
        <h2 className="m-0 mb-[20px] pb-[10px] font-bold text-[18px] border-b-2 border-[#7a1f2b]">More in {label}</h2>
        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-[22px_32px]">
          {related.map((item) => (
            <Link key={item.id} href={`/${item.category}/${item.slug}`} className="grid grid-cols-[88px_1fr] gap-[14px] group">
              <span className="block w-[88px] h-[66px] overflow-hidden flex-none [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
              </span>
              <span className="flex flex-col gap-[4px] min-w-0">
                <span className={CATEGORY_LABEL}>{categoryLabel(item.category)}</span>
                <span className={`font-bold ${SERIF} text-[14.5px] leading-[1.3] text-[#1a1a1a] group-hover:text-[#7a1f2b]`}>{item.title}</span>
                <small className="text-[#6b6b6b] text-[11.5px]">{timeAgo(item.publishedAt)}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className={`${SHELL} pt-[8px] pb-[30px]`}>
        <Newsletter />
      </div>
    </main>
  );
}