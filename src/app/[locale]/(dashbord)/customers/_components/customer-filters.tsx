"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function CustomerFilters() {
  const t = useTranslations("customers");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      {/* Search */}
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("search")}
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {/* Filter */}
      {/* <div className="flex flex-row items-center gap-3 sm:w-[420px] shrink-0">
        <p className="text-[#000709] font-medium text-base lg:text-[18px] whitespace-nowrap">
          {t("filterByPackage")}
        </p>
        <Select defaultValue="">
          <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm text-right px-3">
            <SelectValue placeholder={t("basicPackage")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="basic">{t("basicPackage")}</SelectItem>
            <SelectItem value="silver">الفضية</SelectItem>
            <SelectItem value="gold">الذهبية</SelectItem>
            <SelectItem value="platinum">البلاتية</SelectItem>
          </SelectContent>
        </Select>
      </div> */}
    </div>
  );
}
