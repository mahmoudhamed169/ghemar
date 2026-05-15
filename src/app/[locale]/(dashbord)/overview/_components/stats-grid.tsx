import { getOverview } from "@/shared/lib/services/overview/get-overview";
import StatCard from "./stat-card";
import { Truck, DollarSign, Activity, ShoppingBag } from "lucide-react";

import { getTranslations } from "next-intl/server";

export default async function StatsGrid() {
  const [res, t] = await Promise.all([
    getOverview(),
    getTranslations("overview.stats"),
  ]);

  const data = res.data;

  const stats = [
    {
      title: t("totalOrders"),
      value: data.totalOrders.toLocaleString(),
      subtitle: t("thisMonth"),
      icon: ShoppingBag,
      iconColor: "text-blue-500",
      iconBg: "bg-blue-50",
      badgeType: "positive" as const,
    },
    {
      title: t("activeOrders"),
      value: data.activeOrders.toLocaleString(),
      subtitle: t("now"),
      icon: Activity,
      iconColor: "text-purple-500",
      iconBg: "bg-purple-50",
      badgeType: "positive" as const,
    },
    {
      title: t("revenue"),
      value: `${data.totalRevenue.toLocaleString()} ر.س`,
      subtitle: t("thisMonth"),
      icon: DollarSign,
      iconColor: "text-yellow-500",
      iconBg: "bg-yellow-50",
      badgeType: "positive" as const,
    },
    {
      title: t("activeDrivers"),
      value: data.activeDrivers.toLocaleString(),
      subtitle: t("ofTotal"),
      icon: Truck,
      iconColor: "text-green-500",
      iconBg: "bg-green-50",
      badgeType: "neutral" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}