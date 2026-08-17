"use client";

import { useState } from "react";
import { SocialIcon } from "./SocialIcon";

export function ShareRow({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard API unavailable — silently ignore.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  const btnClass =
    "w-[34px] h-[34px] grid place-items-center rounded-full bg-[#f7f5f2] text-[#7a1f2b] border border-[#e5e0d8] cursor-pointer transition-colors duration-150 ease-in-out hover:bg-[#7a1f2b] hover:text-white hover:border-[#7a1f2b]";

  return (
    <div className="flex items-center gap-[8px] relative">
      <span className="font-extrabold text-[11px] tracking-[.12em] uppercase text-[#6b6b6b] mr-[4px] font-['Arial','Helvetica',sans-serif]">
        Share
      </span>
      <a className={btnClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <SocialIcon name="facebook" size={15} />
      </a>
      <a className={btnClass} href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <SocialIcon name="x" size={15} />
      </a>
      <a className={btnClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        <SocialIcon name="linkedin" size={15} />
      </a>
      <a className={btnClass} href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on WhatsApp">
        <SocialIcon name="whatsapp" size={15} />
      </a>
      <button type="button" className={btnClass} onClick={copyLink} aria-label="Copy article link">
        <SocialIcon name={copied ? "check" : "link"} size={15} />
      </button>
      {copied && (
        <span
          className="absolute right-0 top-[calc(100%+6px)] bg-[#1a1a1a] text-white text-[11px] px-[10px] py-[5px] whitespace-nowrap"
          role="status"
        >
          Copied!
        </span>
      )}
    </div>
  );
}
