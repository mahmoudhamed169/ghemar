import { getTranslations } from "next-intl/server";
import { Activity, AlertTriangle, CheckCircle2, ShoppingBag } from "lucide-react";
import {
  getOrdersStats,
  OrdersStats as OrdersStatsData,
  OrdersStatsFilters,
} from "@/shared/lib/services/orders/get-orders-stats";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

export default async function OrdersStats(filters: OrdersStatsFilters) {
  const t = await getTranslations("orders.stats");

  let stats: OrdersStatsData;
  try {
    stats = await getOrdersStats(filters);
  } catch {
    return <StatsError />;
  }

  const format = (n: number) => n.toLocaleString("en-US");

  return (
    <StatsRow>
      <StatCard
        title={t("total")}
        value={format(stats.total)}
        icon={ShoppingBag}
        iconColor="text-blue-500"
        iconBg="bg-blue-50"
      />
      <StatCard
        title={t("active")}
        value={format(stats.active)}
        icon={Activity}
        iconColor="text-purple-500"
        iconBg="bg-purple-50"
      />
      <StatCard
        title={t("completed")}
        value={format(stats.completed)}
        icon={CheckCircle2}
        iconColor="text-green-500"
        iconBg="bg-green-50"
      />
      <StatCard
        title={t("problem")}
        value={format(stats.problem)}
        icon={AlertTriangle}
        iconColor="text-red-500"
        iconBg="bg-red-50"
      />
    </StatsRow>
  );
}
