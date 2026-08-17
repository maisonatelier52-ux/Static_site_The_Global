"use client";

import { useState } from "react";
import { SocialIcon } from "./SocialIcon";

export function ArticleShare({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function nativeShare() {
    if (navigator.share) await navigator.share({ title, url });
    else await copyLink();
  }

  const btnClass =
    "w-[34px] h-[34px] grid place-items-center rounded-full bg-[#f7f5f2] text-[#7a1f2b] border border-[#e5e0d8] cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#7a1f2b] hover:text-white hover:border-[#7a1f2b]";

  return (
    <div className="flex items-center gap-[8px]">
      <span className="font-extrabold text-[11px] tracking-[.12em] uppercase text-[#6b6b6b] mr-[4px] font-['Arial','Helvetica',sans-serif]">
        Share
      </span>
      <a className={btnClass} href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X"><SocialIcon name="x" /></a>
      <a className={btnClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><SocialIcon name="facebook" /></a>
      <a className={btnClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"><SocialIcon name="linkedin" /></a>
      <button className={btnClass} onClick={copyLink} aria-label="Copy article link"><SocialIcon name="link" /></button>
      <button
        className="border border-[#7a1f2b] bg-transparent text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.08em] px-[12px] py-[8px] cursor-pointer hover:bg-[#7a1f2b] hover:text-white"
        onClick={nativeShare}
      >
        {copied ? "Copied" : "More"}
      </button>
    </div>
  );
}
