"use client";
import { useTranslations, useLocale } from "next-intl";
import { PackageOpen } from "lucide-react";
import { PackageDistributionItem } from "@/shared/lib/types/overview/overview";
import { formatNumber } from "../_lib/format";
import ChartCard from "./chart-card";

const PALETTE = ["#0C6175", "#22c55e", "#3BA99C", "#9ca3af", "#111827", "#f59e0b"];

export default function PackagesDistribution({
  data,
}: {
  data: PackageDistributionItem[];
}) {
  const t = useTranslations("overview");
  const locale = useLocale();

  const total = data.reduce((sum, item) => sum + item.count, 0);
  const items = [...data]
    .sort((a, b) => b.count - a.count)
    .map((item, index) => ({
      id: item.packageId,
      name: (locale === "ar" ? item.name : item.nameEn) || item.name,
      count: item.count,
      // the API doesn't send a percentage for packages, derive it from count
      percentage: total > 0 ? (item.count / total) * 100 : 0,
      color: PALETTE[index % PALETTE.length],
    }));

  return (
    <ChartCard
      title={t("charts.packagesDistribution")}
      subtitle={t("charts.packagesTotal", { count: formatNumber(total) })}
    >
      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
          <PackageOpen className="w-8 h-8 text-gray-300" />
          <p className="text-sm text-gray-400">{t("charts.noPackages")}</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto pe-1">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-700 font-medium truncate">{item.name}</span>
                <span className="flex items-center gap-2 shrink-0 tabular-nums">
                  <span className="font-semibold text-gray-900">
                    {formatNumber(item.count)}
                  </span>
                  <span className="text-xs text-gray-400 w-12 text-end">
                    {formatNumber(Math.round(item.percentage * 10) / 10)}%
                  </span>
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </ChartCard>
  );
}
