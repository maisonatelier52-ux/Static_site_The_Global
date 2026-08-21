import Link from "next/link";
import { navCategories, siteConfig } from "@/lib/site";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="bg-[#101c27] text-white pt-[52px]">
      <div className="w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto grid grid-cols-[1.6fr_repeat(4,1fr)] max-[780px]:grid-cols-2 gap-[46px] max-[780px]:gap-[28px] pb-[44px]">
        <div className="max-[780px]:col-span-2">
          <span className="block font-['Georgia','Times_New_Roman',serif] text-[13px] tracking-[.45em]">THE</span>
          <strong className="block text-[#f3d7da] font-bold font-['Georgia','Times_New_Roman',serif] text-[40px] tracking-[.16em]">GLOBAL</strong>
          <p className="max-w-[260px] text-[#abb6bd] font-['Georgia','Times_New_Roman',serif] text-[14px] leading-[1.55]">{siteConfig.tagline}</p>
          <div className="flex gap-[12px] mt-[18px]">
            <a className="hover:text-[#f1b7be]" href={siteConfig.social.facebook} aria-label="Facebook"><SocialIcon name="facebook" /></a>
            <a className="hover:text-[#f1b7be]" href={siteConfig.social.x} aria-label="X"><SocialIcon name="x" /></a>
            <a className="hover:text-[#f1b7be]" href={siteConfig.social.instagram} aria-label="Instagram"><SocialIcon name="instagram" /></a>
            <a className="hover:text-[#f1b7be]" href={siteConfig.social.linkedin} aria-label="LinkedIn"><SocialIcon name="linkedin" /></a>
            <a className="hover:text-[#f1b7be]" href={siteConfig.social.youtube} aria-label="YouTube"><SocialIcon name="youtube" /></a>
          </div>
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Sections</h2>
          {navCategories.slice(0, 5).map((category) => (
            <Link key={category} className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href={`/${category.toLowerCase()}`}>{category}</Link>
          ))}
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">More</h2>
          {navCategories.slice(5).map((category) => (
            <Link key={category} className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href={`/${category.toLowerCase()}`}>{category}</Link>
          ))}
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Newsroom</h2>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about">About us</Link>
          <a className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href={`mailto:${siteConfig.email}`}>Contact</a>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about#standards">Editorial standards</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/sitemap.xml">Sitemap</Link>
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Legal</h2>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about#privacy">Privacy</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about#terms">Terms of use</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about#corrections">Corrections</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/llms.txt">LLMs.txt</Link>
        </div>
      </div>
      <div className="w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto flex max-[780px]:flex-col justify-between gap-[20px] py-[18px] border-t border-white/12 text-[#8f9aa1] text-[12px]">
        <span>© 2026 {siteConfig.name}. Demo editorial content.</span>
        <span>Built for clear, independent reporting.</span>
      </div>
    </footer>
  );
}