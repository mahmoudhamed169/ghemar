"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("pagination");

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  function getPages(): (number | "...")[] {
    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  return (
    <div className="flex items-center justify-center gap-1 py-4" dir="rtl">
      {/* السابق */}
      <Button
        variant="outline"
        className="h-10 px-4 rounded-lg text-sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {t("prev")}
      </Button>

      {/* Pages */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span
            key={`dots-${i}`}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ···
          </span>
        ) : (
          <Button
            key={page}
            variant="outline"
            onClick={() => goToPage(page as number)}
            className={`w-10 h-10 rounded-lg text-sm p-0 ${
              currentPage === page
                ? "bg-[#000709] text-white hover:bg-[#000709] border-[#000709]"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </Button>
        ),
      )}

      {/* التالي */}
      <Button
        variant="outline"
        className="h-10 px-4 rounded-lg text-sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {t("next")}
      </Button>
    </div>
  );
}
