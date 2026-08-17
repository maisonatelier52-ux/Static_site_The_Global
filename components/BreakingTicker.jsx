"use client";

import Link from "next/link";

export function BreakingTicker({ articles }) {
  const items = articles.slice(0, 5);
  if (items.length === 0) return null;

  return (
    <div
      className="grid grid-cols-[118px_1fr] max-[780px]:grid-cols-[88px_1fr] border border-[#ded8d1] mt-[14px] min-h-[40px] overflow-hidden"
      aria-label="Breaking news"
    >
      <strong className="grid place-items-center bg-[#71151f] text-white text-[11px] uppercase tracking-[.14em] font-['Arial','Helvetica',sans-serif] font-bold">
        Breaking
      </strong>
      <div className="relative overflow-hidden flex items-center [mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)] [-webkit-mask-image:linear-gradient(90deg,transparent,#000_3%,#000_97%,transparent)]">
        <div className="flex items-center whitespace-nowrap w-max animate-[breaking-scroll_34s_linear_infinite] hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none">
          {[...items, ...items].map((article, index) => (
            <Link
              key={`${article.id}-${index}`}
              href={`/${article.category}/${article.slug}`}
              tabIndex={index < items.length ? 0 : -1}
              aria-hidden={index >= items.length ? "true" : undefined}
              className="flex-none px-[24px] border-r border-[#ded8d1] font-['Georgia','Times_New_Roman',serif] text-[13px] before:content-['•'] before:text-[#71151f] before:mr-[12px] hover:text-[#71151f]"
            >
              {article.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
