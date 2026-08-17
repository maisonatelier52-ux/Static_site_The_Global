import Link from "next/link";
import { categoryLabel, formatDate } from "@/data/news";

const SERIF = "font-['Georgia','Times_New_Roman',serif]";

export function StoryCard({
  article,
  variant = "default",
  priority = false,
}) {
  const isOverlay = variant === "overlay";
  const isHorizontal = variant === "horizontal";
  const isMini = variant === "mini";
  const isLead = variant === "lead";
  const isDefault = variant === "default";

const imageAspect = isLead
  ? "aspect-[1.36]"
  : isHorizontal
  ? "aspect-[1.25]"
  : isMini
  ? "aspect-[1.35]"
  : isDefault
  ? "aspect-[0.90]"
  : "";

  const articleClass = [
    "group min-w-0",
    isHorizontal &&
      "grid grid-cols-[112px_1fr] max-[480px]:grid-cols-[96px_1fr] gap-[13px] pb-[13px] border-b border-[#ded8d1]",
    isOverlay && "relative min-h-[460px] overflow-hidden bg-[#101c27]",
  ]
    .filter(Boolean)
    .join(" ");

  const imageClass = [
    "block relative overflow-hidden bg-[#ddd]",
    imageAspect,
    isOverlay && "absolute inset-0",
  ]
    .filter(Boolean)
    .join(" ");

  const copyClass = [
    "pt-[5px]",
    isHorizontal && "pt-[1px]",
    isOverlay &&
      "absolute z-[2] left-0 bottom-0 w-full p-[34px] text-white pt-[10px]",
  ]
    .filter(Boolean)
    .join(" ");

  const categoryClass = [
    "text-[#71151f] text-[10px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]",
    isHorizontal && "text-[8px]",
    isOverlay && "text-[#e2b6bb]",
  ]
    .filter(Boolean)
    .join(" ");

  const h3Class = [
    `mt-[5px] mb-[7px] font-bold leading-[1.12] ${SERIF} text-[15px]`,
    "[&_a:hover]:text-[#71151f]",
    isLead && "text-[clamp(25px,2.2vw,34px)]",
    isHorizontal && "text-[14px] my-[4px] mb-[8px] leading-[1.2]",
    isMini && "text-[16px]",
    isOverlay && "text-[clamp(32px,3.6vw,50px)] max-w-[700px]",
  ]
    .filter(Boolean)
    .join(" ");

  const pClass = [
    `m-0 mb-[10px] text-[#6f6966] ${SERIF} text-[15px] leading-[1.55]`,
    isMini && "hidden",
    isOverlay && "text-[#eee] max-w-[680px]",
  ]
    .filter(Boolean)
    .join(" ");

  const metaClass = [
    "flex gap-[10px] text-[#918a86] text-[9px] uppercase tracking-[.04em] font-['Arial','Helvetica',sans-serif]",
    isHorizontal && "text-[7px]",
    isOverlay && "text-[#d3ceca]",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={articleClass}>
      <Link className={imageClass} href={`/${article.category}/${article.slug}`} aria-label={article.title}>
        <img
          className="h-full object-cover transition-transform duration-[550ms] ease-in-out group-hover:scale-[1.035]"
          src={article.image}
          alt={article.imageAlt}
          loading={priority ? "eager" : "lazy"}
        />
        {isOverlay && (
          <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(5,8,12,.92))]" />
        )}
      </Link>
      <div className={copyClass}>
        <Link className={categoryClass} href={`/${article.category}`}>{categoryLabel(article.category)}</Link>
        <h3 className={h3Class}><Link href={`/${article.category}/${article.slug}`}>{article.title}</Link></h3>
        {(isLead || isDefault) && <p className={pClass}>{article.summary}</p>}
        <div className={metaClass}>
          <span>{formatDate(article.publishedAt)}</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </article>
  );
}
