"use client";

import { useState } from "react";
import Link from "next/link";
import { SocialIcon } from "@/components/SocialIcon";
import { categoryLabel, timeAgo } from "@/data/news";

const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const CATEGORY_LABEL = `inline-block font-extrabold text-[11px] ${SANS} tracking-[.1em] uppercase text-[#7a1f2b]`;
const PAGE_SIZE = 6;

function pageNumbers(current, total) {
  // Always show first, last, current, and current's immediate neighbors;
  // collapse the rest behind an ellipsis so the control stays compact even
  // with many pages.
  const pages = new Set([1, total, current, current - 1, current + 1]);
  return [...pages]
    .filter((page) => page >= 1 && page <= total)
    .sort((a, b) => a - b);
}

export function AuthorArticles({ authorName, stories }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(stories.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = stories.slice(start, start + PAGE_SIZE);
  const numbers = pageNumbers(page, totalPages);

  function goTo(nextPage) {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(clamped);
    document.getElementById("author-articles")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  if (stories.length === 0) {
    return <p className={`m-0 text-[#6b6b6b] text-[14.5px] ${SANS}`}>No published articles yet.</p>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 gap-[30px]">
        {visible.map((article) => (
          <Link key={article.id} href={`/${article.category}/${article.slug}`} className="flex flex-col group">
            <span className="block w-full aspect-[16/10] overflow-hidden mb-[12px] [&>img]:w-full [&>img]:h-full [&>img]:object-cover [&>img]:transition-transform [&>img]:duration-500 [&>img]:ease-in-out group-hover:[&>img]:scale-[1.04]">
              <img src={article.image} alt={article.imageAlt} loading="lazy" />
            </span>
            <span className={CATEGORY_LABEL}>{categoryLabel(article.category)}</span>
            <h3 className={`mt-[8px] mb-[6px] font-bold ${SERIF} text-[20px] leading-[1.2] text-[#1a1a1a] group-hover:text-[#7a1f2b]`}>{article.title}</h3>
            <p className={`m-0 mb-[10px] text-[#6b6b6b] text-[14px] leading-[1.5] ${SANS} line-clamp-2`}>{article.summary}</p>
            <small className="text-[#8b8580] text-[12px]">By {authorName} · {timeAgo(article.publishedAt)} · {article.readTime}</small>
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <nav aria-label="Article pages" className={`flex items-center justify-center gap-[8px] mt-[42px] ${SANS}`}>
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            aria-label="Previous page"
            className="grid place-items-center w-[36px] h-[36px] rounded-full border border-[#e5e0d8] text-[#4a4a4a] hover:border-[#7a1f2b] hover:text-[#7a1f2b] disabled:opacity-35 disabled:pointer-events-none"
          >
            <SocialIcon name="chevronLeft" size={14} />
          </button>

          {numbers.map((number, index) => {
            const prev = numbers[index - 1];
            const showEllipsis = prev !== undefined && number - prev > 1;
            return (
              <span key={number} className="flex items-center gap-[8px]">
                {showEllipsis && <span className="text-[#a39d96] text-[13px] px-[2px]">…</span>}
                <button
                  type="button"
                  onClick={() => goTo(number)}
                  aria-current={number === page ? "page" : undefined}
                  className={`grid place-items-center w-[36px] h-[36px] rounded-full text-[13.5px] font-bold border ${
                    number === page
                      ? "bg-[#7a1f2b] border-[#7a1f2b] text-white"
                      : "border-[#e5e0d8] text-[#4a4a4a] hover:border-[#7a1f2b] hover:text-[#7a1f2b]"
                  }`}
                >
                  {number}
                </button>
              </span>
            );
          })}

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            aria-label="Next page"
            className="grid place-items-center w-[36px] h-[36px] rounded-full border border-[#e5e0d8] text-[#4a4a4a] hover:border-[#7a1f2b] hover:text-[#7a1f2b] disabled:opacity-35 disabled:pointer-events-none"
          >
            <SocialIcon name="chevronRight" size={14} />
          </button>
        </nav>
      )}
    </div>
  );
}