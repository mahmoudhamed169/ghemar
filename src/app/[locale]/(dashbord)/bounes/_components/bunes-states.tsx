import { getTranslations } from "next-intl/server";
import { RefreshCw, Users, Zap, Star } from "lucide-react";
import { getRewardsStats } from "@/shared/lib/services/rewards/get-rewards-stats";
import StatCard from "./stat-card";

export default async function BunesStates() {
  const [t, { data }] = await Promise.all([
    getTranslations("Bounes.stats"),
    getRewardsStats(),
  ]);

  const stats = [
    {
      icon: <RefreshCw />,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500",
      value: data.redemptionsCount,
      label: t("unit.redemption"),
      subLabel: t("redemptionsCount"),
    },
    {
      icon: <Users />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      value: data.activeUsers,
      label: t("unit.user"),
      subLabel: t("activeUsers"),
    },
    {
      icon: <Zap />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      value: data.totalUsed,
      label: t("unit.point"),
      subLabel: t("totalUsed"),
    },
    {
      icon: <Star />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500",
      value: data.totalIssued,
      label: t("unit.point"),
      subLabel: t("totalIssued"),
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}
