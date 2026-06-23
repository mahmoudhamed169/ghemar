"use client";

import { Suspense, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePackages } from "@/shared/lib/hooks/packages/use-packages";

function ActivationCodesFilterInner() {
  const t = useTranslations("Bags.activationFilter");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data: packagesData, isLoading } = usePackages();
  const packages = packagesData?.data ?? [];

  const currentPackage = searchParams.get("packageId") ?? "all";
  const currentIsUsed  = searchParams.get("isUsed")    ?? "all";

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "all") params.delete(key);
      else params.set(key, value);
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex flex-wrap items-center gap-3 justify-end">
      {/* Package filter */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {t("packageLabel")}
        </p>
        <Select
          value={currentPackage}
          onValueChange={(v) => updateParam("packageId", v === "all" ? null : v)}
          disabled={isLoading}
        >
          <SelectTrigger className="w-40 h-10 bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
            <SelectValue placeholder={t("packageAll")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("packageAll")}</SelectItem>
            {packages.map((pkg) => (
              <SelectItem key={pkg._id} value={pkg._id}>
                {locale === "ar" ? pkg.nameAr : pkg.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* isUsed filter */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium text-gray-600 whitespace-nowrap">
          {t("statusLabel")}
        </p>
        <Select
          value={currentIsUsed}
          onValueChange={(v) => updateParam("isUsed", v === "all" ? null : v)}
        >
          <SelectTrigger className="w-32 h-10 bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
            <SelectValue placeholder={t("statusAll")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("statusAll")}</SelectItem>
            <SelectItem value="false">{t("statusAvailable")}</SelectItem>
            <SelectItem value="true">{t("statusUsed")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default function ActivationCodesFilter() {
  return (
    <Suspense fallback={null}>
      <ActivationCodesFilterInner />
    </Suspense>
  );
}
