"use client";

import { useEffect, useState } from "react";
import { SocialIcon } from "./SocialIcon";

export function ArticleToc({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id || "");

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter(Boolean);
    if (headings.length === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      className="bg-[#f7f5f2] border border-[#e5e0d8] p-[20px] [&_h2]:m-0 [&_h2]:mb-[14px] [&_h2]:pb-[12px] [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:font-bold [&_h2]:text-[15px] [&_h2]:tracking-[.02em] [&_h2]:uppercase [&_h2]:text-[#1a1a1a] [&_h2]:border-b-2 [&_h2]:border-[#7a1f2b] [&_h2]:flex [&_h2]:items-center [&_h2]:gap-[8px]"
      aria-label="Table of contents"
    >
      <h2><SocialIcon name="list" size={14} /> Table of Contents</h2>
      <ul className="list-none m-0 p-0 flex flex-col gap-[2px]">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block py-[8px] pl-[10px] pr-[2px] font-['Arial','Helvetica',sans-serif] text-[13.5px] leading-[1.3] border-l-2 hover:text-[#7a1f2b] ${
                activeId === section.id
                  ? "text-[#7a1f2b] font-bold border-l-[#7a1f2b]"
                  : "text-[#595451] border-l-transparent"
              }`}
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
