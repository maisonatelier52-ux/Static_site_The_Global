import Link from "next/link";
import { authors } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: `Meet the mission, standards and journalists behind ${siteConfig.name}.`,
};

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const KICKER = "text-[#71151f] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]";

function SectionHeading({ children, action }) {
  return (
    <div className="flex items-end justify-between gap-[12px] mb-[16px] pb-[8px] border-b-2 border-[#171515] [&_h2]:m-0 [&_h2]:font-bold [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[18px] [&_h2]:uppercase [&_h2]:tracking-[.04em] [&>span]:text-[#6f6966] [&>span]:text-[11px] [&>span]:uppercase [&>span]:tracking-[.1em]">
      {children}
      {action}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="min-h-[600px] flex items-center bg-[#101c27] text-white relative overflow-hidden after:content-['G'] after:absolute after:-right-[20px] after:-bottom-[180px] after:text-white/[.035] after:font-bold after:font-['Georgia','Times_New_Roman',serif] after:text-[650px] after:leading-[.8]">
        <div className={`${SHELL} relative z-[1]`}>
          <nav className="flex flex-wrap gap-[9px] items-center text-[#9aa6ae] text-[13px] mb-[36px]" aria-label="Breadcrumb">
            <Link className="hover:text-[#71151f]" href="/">Home</Link><span>/</span><span>About</span>
          </nav>
          <span className="text-[#d8a9ae] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]">Independent by design</span>
          <h1 className="mt-[14px] mb-[24px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(56px,8vw,104px)] leading-[.88] tracking-[-.055em]">
            News that respects<br />your attention.
          </h1>
          <p className="max-w-[650px] ml-auto text-[#c6cdd1] font-['Georgia','Times_New_Roman',serif] text-[19px] leading-[1.6]">
            {siteConfig.name} is a demonstration newsroom built around a simple promise: show the evidence, explain the stakes and make uncertainty visible.
          </p>
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-[240px_1fr] max-[780px]:grid-cols-1 gap-[55px] max-[780px]:gap-[24px] py-[80px] max-[780px]:py-[55px]`}>
        <span className="text-[#71151f] text-[10px] uppercase tracking-[.14em]">01 / Our purpose</span>
        <div>
          <h2 className="max-w-[850px] mb-[26px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(38px,5vw,65px)] leading-[1] tracking-[-.035em]">
            We make a complicated world clearer—without pretending it is simple.
          </h2>
          <p className="max-w-[740px] text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[17px] leading-[1.75]">
            Our journalism connects events to the systems behind them. We read the filings, question the numbers, listen to the people closest to the story and distinguish what is known from what is still being tested.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f1eb] py-[64px]" id="standards">
        <div className={SHELL}>
          <SectionHeading action={<span>How every story earns trust</span>}><h2>Editorial principles</h2></SectionHeading>
          <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 gap-0 border border-[#ded8d1]">
            {[
              { n: "01", t: "Evidence first", d: "Claims are attributed, documents are examined and important uncertainty is never hidden in the fine print." },
              { n: "02", t: "Context matters", d: "A development becomes useful when readers can see what preceded it, who holds power and what may happen next." },
              { n: "03", t: "Corrections are visible", d: "When the record changes, we update the work promptly and explain material corrections clearly." },
              { n: "04", t: "People over spectacle", d: "We report consequences with care and avoid turning vulnerability, conflict or grief into decoration." },
            ].map((item, index) => (
              <article
                key={item.n}
                className={`min-h-[300px] max-[780px]:min-h-0 p-[28px] border-r border-[#ded8d1] last:border-r-0 max-[1100px]:[&:nth-child(2)]:border-r-0 max-[1100px]:[&:nth-child(-n+2)]:border-b max-[1100px]:[&:nth-child(-n+2)]:border-[#ded8d1] max-[780px]:border-r-0 max-[780px]:border-b max-[780px]:last:border-b-0`}
              >
                <b className="text-[#71151f] font-['Georgia','Times_New_Roman',serif] text-[30px]">{item.n}</b>
                <h3 className="mt-[55px] max-[780px]:mt-[24px] mb-[12px] font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">{item.t}</h3>
                <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">{item.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-[.8fr_1.2fr] max-[780px]:grid-cols-1 gap-[80px] max-[780px]:gap-[24px] py-[80px] max-[780px]:py-[55px]`}>
        <div>
          <span className={KICKER}>Our process</span>
          <h2 className="max-w-[420px] my-[10px] font-bold font-['Georgia','Times_New_Roman',serif] text-[48px] leading-none">From first signal to published dispatch.</h2>
        </div>
        <ol className="list-none m-0 p-0">
          {[
            { n: "01", t: "Report", d: "Gather primary records, firsthand accounts and relevant expertise." },
            { n: "02", t: "Verify", d: "Test details across independent sources and document what cannot yet be confirmed." },
            { n: "03", t: "Edit", d: "Challenge assumptions, sharpen the language and check the story against the evidence." },
            { n: "04", t: "Update", d: "Follow the consequences and revise the record when meaningful new facts emerge." },
          ].map((item) => (
            <li key={item.n} className="grid grid-cols-[60px_1fr] gap-[18px] py-[22px] border-b border-[#ded8d1]">
              <b className="text-[#71151f] font-['Georgia','Times_New_Roman',serif] text-[24px]">{item.n}</b>
              <span className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[14px] leading-[1.55]">
                <strong className="block text-[#171515] font-bold font-['Georgia','Times_New_Roman',serif] text-[20px]">{item.t}</strong>
                {item.d}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${SHELL} pb-[80px]`}>
        <SectionHeading action={<span>Six journalists, one shared standard</span>}><h2>Meet the newsroom</h2></SectionHeading>
        <div className="grid grid-cols-3 max-[780px]:grid-cols-2 gap-[18px]">
          {authors.map((author) => (
            <Link
              href={`/author/${author.slug}`}
              key={author.slug}
              className="relative min-h-[360px] max-[480px]:min-h-[420px] overflow-hidden bg-[#101c27] block group"
            >
              <img
                src={author.image}
                alt={author.name}
                loading="lazy"
                className="h-full object-cover grayscale transition-transform duration-500 ease-in-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 p-[24px] bg-[linear-gradient(transparent,rgba(0,0,0,.9))] text-white">
                <strong className="block font-bold font-['Georgia','Times_New_Roman',serif] text-[24px]">{author.name}</strong>
                <small className="block mt-[5px] text-[#ddd] text-[9px] uppercase">{author.role}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-3 max-[780px]:grid-cols-1 gap-[1px] mb-[70px] bg-[#ded8d1] border border-[#ded8d1]`} id="corrections">
        <article className="bg-[#fffefa] p-[30px]">
          <span id="privacy" className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Privacy</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Minimal by default.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">This demo does not submit newsletter addresses to a server. Connect the form to your chosen provider before production.</p>
        </article>
        <article className="bg-[#fffefa] p-[30px]">
          <span id="terms" className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Terms</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Demo content.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">All names, headlines and reporting scenarios in this starter are illustrative and should be replaced with your newsroom’s verified material.</p>
        </article>
        <article className="bg-[#fffefa] p-[30px]">
          <span className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Corrections</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Make the record clear.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">
            Publish a dated correction note on the affected story and explain what changed. Contact <a className="text-[#71151f]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </article>
      </section>
    </main>
  );
}
