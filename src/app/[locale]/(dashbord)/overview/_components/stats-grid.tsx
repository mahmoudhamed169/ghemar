import { getTranslations } from "next-intl/server";
import { Truck, DollarSign, Activity, ShoppingBag } from "lucide-react";
import { OverviewCards } from "@/shared/lib/types/overview/overview";
import { formatCurrency, formatNumber, formatSigned } from "../_lib/format";
import StatCard from "./stat-card";

export default async function StatsGrid({ cards }: { cards: OverviewCards }) {
  const t = await getTranslations("overview");
  const { totalOrders, activeOrders, revenue, activeDrivers } = cards;
  const ratio = Math.min(Math.max(activeDrivers.ratio, 0), 100);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title={t("stats.totalOrders")}
        value={formatNumber(totalOrders.value)}
        icon={ShoppingBag}
        iconColor="text-blue-500"
        iconBg="bg-blue-50"
        trend={{
          value: totalOrders.growth,
          text: formatSigned(totalOrders.growth, "%"),
          caption: t("stats.vsLastMonth"),
        }}
      />
      <StatCard
        title={t("stats.activeOrders")}
        value={formatNumber(activeOrders.value)}
        icon={Activity}
        iconColor="text-purple-500"
        iconBg="bg-purple-50"
        trend={{
          value: activeOrders.diff,
          text: formatSigned(activeOrders.diff),
          caption: t("stats.vsPrevious"),
        }}
      />
      <StatCard
        title={t("stats.revenue")}
        value={formatCurrency(revenue.value, t("currency"))}
        icon={DollarSign}
        iconColor="text-yellow-500"
        iconBg="bg-yellow-50"
        trend={{
          value: revenue.growth,
          text: formatSigned(revenue.growth, "%"),
          caption: t("stats.vsLastMonth"),
        }}
      />
      <StatCard
        title={t("stats.activeDrivers")}
        value={t("stats.driversOf", {
          active: formatNumber(activeDrivers.activeCount),
          total: formatNumber(activeDrivers.totalCount),
        })}
        icon={Truck}
        iconColor="text-green-500"
        iconBg="bg-green-50"
        footer={
          <div className="flex flex-col gap-1.5 mt-auto">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">{t("stats.activityRate")}</span>
              <span className="font-semibold text-gray-700 tabular-nums">
                {formatNumber(activeDrivers.ratio)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0C6175] transition-all"
                style={{ width: `${ratio}%` }}
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
