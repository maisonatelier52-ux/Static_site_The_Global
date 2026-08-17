import Link from "next/link";

const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";

function pageHref(basePath, page) {
  return page <= 1 ? basePath : `${basePath}?page=${page}`;
}

// Builds a compact page list like: 1 … 4 5 6 … 12
function getPageItems(currentPage, totalPages) {
  const delta = 1;
  const items = [];
  let lastShown = 0;

  for (let page = 1; page <= totalPages; page++) {
    const isEdge = page === 1 || page === totalPages;
    const isNearCurrent = page >= currentPage - delta && page <= currentPage + delta;

    if (isEdge || isNearCurrent) {
      if (lastShown && page - lastShown > 1) {
        items.push({ type: "ellipsis", key: `ellipsis-${page}` });
      }
      items.push({ type: "page", page });
      lastShown = page;
    }
  }

  return items;
}

export function Pagination({ basePath, currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-[8px] mt-[26px] pt-[26px] border-t border-[#ded8d1]"
    >
      <Link
        href={pageHref(basePath, Math.max(1, currentPage - 1))}
        aria-disabled={isFirst}
        tabIndex={isFirst ? -1 : undefined}
        className={`h-[38px] px-[16px] inline-flex items-center justify-center border text-[11px] font-bold uppercase tracking-[.08em] ${SANS} transition-colors ${
          isFirst
            ? "pointer-events-none border-[#ded8d1] text-[#c7c1bb]"
            : "border-[#171515] text-[#171515] hover:bg-[#171515] hover:text-white"
        }`}
      >
        ← Prev
      </Link>

      <div className="flex items-center gap-[6px]">
        {items.map((item) =>
          item.type === "ellipsis" ? (
            <span
              key={item.key}
              className="w-[38px] text-center text-[#918a86] text-[13px]"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <Link
              key={item.page}
              href={pageHref(basePath, item.page)}
              aria-current={item.page === currentPage ? "page" : undefined}
              className={`h-[38px] w-[38px] inline-flex items-center justify-center ${SERIF} text-[14px] border transition-colors ${
                item.page === currentPage
                  ? "bg-[#71151f] border-[#71151f] text-white"
                  : "border-[#ded8d1] text-[#171515] hover:border-[#71151f] hover:text-[#71151f]"
              }`}
            >
              {item.page}
            </Link>
          ),
        )}
      </div>

      <Link
        href={pageHref(basePath, Math.min(totalPages, currentPage + 1))}
        aria-disabled={isLast}
        tabIndex={isLast ? -1 : undefined}
        className={`h-[38px] px-[16px] inline-flex items-center justify-center border text-[11px] font-bold uppercase tracking-[.08em] ${SANS} transition-colors ${
          isLast
            ? "pointer-events-none border-[#ded8d1] text-[#c7c1bb]"
            : "border-[#171515] text-[#171515] hover:bg-[#171515] hover:text-white"
        }`}
      >
        Next →
      </Link>
    </nav>
  );
}