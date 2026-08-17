import Link from "next/link";
import { categoryLabel } from "@/data/news";
import { SocialIcon } from "@/components/SocialIcon";

const CATEGORY_LABEL =
  "inline-block font-extrabold text-[9.5px] font-['Arial','Helvetica',sans-serif] tracking-[.1em] uppercase text-[#7a1f2b]";

function NavCard({ article, direction }) {
  if (!article) {
    return <span className="hidden min-[641px]:block" aria-hidden="true" />;
  }

  const isPrev = direction === "previous";

  return (
    <Link
      href={`/${article.category}/${article.slug}`}
      className={`group flex items-center gap-[16px] border border-[#e5e0d8] bg-[#f7f5f2] p-[16px] min-w-0 rounded-lg hover:border-[#7a1f2b] ${
        isPrev ? "" : "text-right flex-row-reverse"
      }`}
    >
      <span className="block w-[76px] h-[76px] flex-none overflow-hidden [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
        <img src={article.image} alt={article.imageAlt} loading="lazy" />
      </span>
      <span className={`flex flex-col gap-[6px] min-w-0 ${isPrev ? "items-start" : "items-end"}`}>
        <span
          className={`flex items-center gap-[6px] text-[#6b6b6b] font-bold text-[8px] font-['Arial','Helvetica',sans-serif] tracking-[.08em] uppercase ${
            isPrev ? "" : "flex-row-reverse"
          }`}
        >
          <SocialIcon name={isPrev ? "chevronLeft" : "chevronRight"} size={11} />
          {isPrev ? "Previous Article" : "Next Article"}
        </span>
        <span className={CATEGORY_LABEL}>{categoryLabel(article.category)}</span>
        <span className="font-bold font-['Georgia','Times_New_Roman',serif] text-[12.5px] leading-[1.3] text-[#1a1a1a] line-clamp-2 group-hover:text-[#7a1f2b]">
          {article.title}
        </span>
      </span>
    </Link>
  );
}

export function ArticleNav({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="More articles" className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-[16px]">
      <NavCard article={previous} direction="previous" />
      <NavCard article={next} direction="next" />
    </nav>
  );
}