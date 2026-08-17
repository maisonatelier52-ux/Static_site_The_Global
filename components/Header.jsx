"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { navCategories, siteConfig } from "@/lib/site";
import { SocialIcon } from "./SocialIcon";

export function Header({ searchItems }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    return searchItems
      .filter((item) =>
        `${item.title} ${item.summary} ${item.category}`.toLowerCase().includes(needle),
      )
      .slice(0, 7);
  }, [query, searchItems]);

  const dateLabel = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="bg-[#fffefa] relative z-30">
      <div className="min-h-[34px] max-[780px]:justify-center flex items-center gap-[20px] border-b border-[#ded8d1] text-[#69625e] text-[10px] font-['Arial','Helvetica',sans-serif] w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
        <span>{dateLabel}</span>
        <span className="pl-[20px] border-l border-[#ded8d1] max-[780px]:hidden">Edition: International</span>
        <div className="ml-auto max-[780px]:hidden flex items-center gap-[10px]" aria-label="Follow The Global Dispatch">
          <span>Follow us</span>
          <a className="grid place-items-center hover:text-[#71151f]" href={siteConfig.social.facebook} aria-label="Facebook"><SocialIcon name="facebook" size={14} /></a>
          <a className="grid place-items-center hover:text-[#71151f]" href={siteConfig.social.x} aria-label="X"><SocialIcon name="x" size={14} /></a>
          <a className="grid place-items-center hover:text-[#71151f]" href={siteConfig.social.instagram} aria-label="Instagram"><SocialIcon name="instagram" size={14} /></a>
          <a className="grid place-items-center hover:text-[#71151f]" href={siteConfig.social.youtube} aria-label="YouTube"><SocialIcon name="youtube" size={15} /></a>
        </div>
      </div>

      <div className="min-h-[122px] max-[780px]:min-h-[106px] grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#ded8d1] w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
        <button className="justify-self-start flex gap-[8px] items-center bg-transparent border-0 cursor-pointer text-[13px] py-[12px]" onClick={() => setSearchOpen(true)} aria-label="Open search">
          <SocialIcon name="search" size={17} /><span className="max-[780px]:hidden">Search</span>
        </button>
        <Link className="text-center flex flex-col items-center" href="/" aria-label={`${siteConfig.name} home`}>
          <span className="font-['Georgia','Times_New_Roman',serif] text-[13px] leading-none tracking-[.55em] pl-[.55em]">THE</span>
          <span className="font-bold font-['Georgia','Times_New_Roman',serif] text-[48px] max-[780px]:text-[30px] leading-[.95] text-[#4f0b13] tracking-[.22em] pl-[.22em]">GLOBAL</span>
          <span className="italic font-['Georgia','Times_New_Roman',serif] text-[10px] text-[#77706d] mt-[8px] max-[780px]:hidden">{siteConfig.tagline}</span>
        </Link>
        <Link
          href="#subscribe"
          className="justify-self-end max-[780px]:hidden bg-[#71151f] text-white text-[13px] px-[20px] py-[12px] rounded-[2px] hover:bg-[#4f0b13]"
        >
          <span className="text-white font-medium">Subscribe</span>
        </Link>
        <button
          className="hidden max-[780px]:block justify-self-end border-0 bg-transparent p-[10px] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <SocialIcon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      <nav
        className={`border-b border-[#ded8d1] max-[780px]:absolute max-[780px]:w-full max-[780px]:bg-[#fffefa] max-[780px]:shadow-[0_18px_28px_rgba(0,0,0,.12)] ${
          menuOpen ? "max-[780px]:block" : "max-[780px]:hidden"
        }`}
        aria-label="Primary navigation"
      >
        <div className="flex justify-center max-[780px]:grid max-[780px]:grid-cols-2 max-[780px]:px-[14px] max-[780px]:pt-[10px] max-[780px]:pb-[18px] gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex-none px-[19px] py-[14px] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:border-b max-[780px]:border-[#ded8d1] max-[780px]:px-[9px] max-[780px]:py-[13px] hover:text-[#71151f] hover:bg-[#f8f5f1]">Home</Link>
          {navCategories.map((category) => (
            <Link
              key={category}
              href={`/${category.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="flex-none px-[19px] py-[14px] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:border-b max-[780px]:border-[#ded8d1] max-[780px]:px-[9px] max-[780px]:py-[13px] hover:text-[#71151f] hover:bg-[#f8f5f1]"
            >
              {category}
            </Link>
          ))}
          <Link href="/about" onClick={() => setMenuOpen(false)} className="flex-none px-[19px] py-[14px] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:border-b max-[780px]:border-[#ded8d1] max-[780px]:px-[9px] max-[780px]:py-[13px] hover:text-[#71151f] hover:bg-[#f8f5f1]">About</Link>
        </div>
      </nav>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-start justify-items-center pt-[11vh] max-[780px]:pt-[4vh] bg-black/65 backdrop-blur-[5px]"
          role="dialog"
          aria-modal="true"
          aria-label="Search stories"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSearchOpen(false);
          }}
        >
          <div className="w-[min(720px,calc(100%-32px))] max-h-[78vh] overflow-auto bg-[#fffefa] shadow-[0_25px_80px_rgba(0,0,0,.28)] p-[24px]">
            <div className="flex items-center justify-between mb-[18px]">
              <span className="font-bold font-['Georgia','Times_New_Roman',serif] text-[13px] uppercase tracking-[.15em]">Search the newsroom</span>
              <button className="border-0 bg-transparent cursor-pointer" onClick={() => setSearchOpen(false)} aria-label="Close search"><SocialIcon name="close" size={22} /></button>
            </div>
            <div className="flex items-center gap-[12px] px-[3px] pb-[12px] border-b-2 border-[#171515]">
              <SocialIcon name="search" size={22} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics, people and places"
                aria-label="Search query"
                className="flex-1 border-0 outline-none bg-transparent font-['Georgia','Times_New_Roman',serif] text-[28px] max-[780px]:text-[20px] min-w-0"
              />
            </div>
            <div className="pt-[10px]" aria-live="polite">
              {query.trim().length < 2 && <p className="text-[#6f6966] text-[14px]">Type at least two characters to search.</p>}
              {query.trim().length >= 2 && results.length === 0 && <p className="text-[#6f6966] text-[14px]">No stories found. Try another term.</p>}
              {results.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.category}/${item.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="grid grid-cols-[95px_1fr] max-[780px]:grid-cols-1 gap-x-[16px] gap-y-[4px] py-[14px] px-[4px] border-b border-[#ded8d1]"
                >
                  <span className="row-span-2 max-[780px]:row-auto text-[#71151f] uppercase text-[11px] font-extrabold tracking-[.12em] pt-[4px]">{item.category}</span>
                  <strong className="font-bold font-['Georgia','Times_New_Roman',serif] text-[18px]">{item.title}</strong>
                  <small className="text-[#6f6966] overflow-hidden whitespace-nowrap text-ellipsis">{item.summary}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
