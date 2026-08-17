import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-[65vh] flex flex-col justify-center items-start w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto"
    >
      <span className="text-[#71151f] text-[10px] uppercase tracking-[.15em]">404 / Off the record</span>
      <h1 className="my-[12px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(46px,7vw,86px)] leading-[.9]">
        This page missed the edition.
      </h1>
      <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[17px]">
        The story may have moved, or the address may be incomplete.
      </p>
      <Link
        href="/"
        className="mt-[20px] bg-[#71151f] text-white px-[18px] py-[13px] text-[11px] uppercase tracking-[.1em]"
      >
        Return to the front page
      </Link>
    </main>
  );
}
