"use client";
import { Suspense, useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useSession } from "next-auth/react";
import { checkIsSuperAdmin } from "@/shared/lib/utils/is-super-admin";

interface Branch { _id: string; name: string; nameAr?: string }

function CustomerFiltersInner() {
  const t = useTranslations("customers");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const branchName = (b: Branch) => (locale === "ar" ? b.nameAr || b.name : b.name);

  const isSuperAdmin = checkIsSuperAdmin(
    session?.user?.role,
    (session?.user as any)?.isBranchAdmin,
  );

  const [branches, setBranches] = useState<Branch[]>([]);
  const currentBranch = searchParams.get("branchId") ?? "all";

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) params.delete(key); else params.set(key, value);
      params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const handleSearch = useDebouncedCallback((value: string) => {
    updateParam("search", value || null);
  }, 400);

  useEffect(() => {
    if (!isSuperAdmin) return;
    fetch("/api/branches")
      .then((r) => r.json())
      .then((res) => setBranches(res.data ?? []))
      .catch(() => {});
  }, [isSuperAdmin]);

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
      <div className="relative flex-1">
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          size={18}
        />
        <Input
          placeholder={t("search")}
          defaultValue={searchParams.get("search") ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white h-12 sm:h-[55px] rounded-lg pr-10 text-right border border-gray-200 shadow-sm"
        />
      </div>

      {isSuperAdmin && (
        <div className="flex flex-row items-center gap-3 w-full sm:w-[280px] shrink-0">
          <p className="text-[#000709] font-medium text-[16px] sm:text-[18px] whitespace-nowrap">
            {t("branch_label")}
          </p>
          <Select
            value={currentBranch}
            onValueChange={(value) =>
              updateParam("branchId", value === "all" ? null : value)
            }
          >
            <SelectTrigger className="flex-1 !h-[55px] bg-white border border-gray-200 rounded-lg shadow-sm px-3">
              <SelectValue placeholder={t("branch_all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("branch_all")}</SelectItem>
              {branches.map((b) => (
                <SelectItem key={b._id} value={b._id}>{branchName(b)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

export default function CustomerFilters() {
  return (
    <Suspense fallback={null}>
      <CustomerFiltersInner />
    </Suspense>
  );
}
