import { getTranslations } from "next-intl/server";
import { RefreshCw, Users, Zap, Star } from "lucide-react";
import { getRewardsStats } from "@/shared/lib/services/rewards/get-rewards-stats";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

export default async function BunesStates() {
  const t = await getTranslations("Bounes.stats");

  let data: Awaited<ReturnType<typeof getRewardsStats>>["data"];
  try {
    ({ data } = await getRewardsStats());
  } catch {
    return <StatsError />;
  }

  return (
    <StatsRow>
      <StatCard
        title={t("redemptionsCount")}
        value={`${data.redemptionsCount} ${t("unit.redemption")}`}
        icon={RefreshCw}
        iconBg="bg-orange-100"
        iconColor="text-orange-500"
      />
      <StatCard
        title={t("activeUsers")}
        value={`${data.activeUsers} ${t("unit.user")}`}
        icon={Users}
        iconBg="bg-blue-100"
        iconColor="text-blue-500"
      />
      <StatCard
        title={t("totalUsed")}
        value={`${data.totalUsed} ${t("unit.point")}`}
        icon={Zap}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />
      <StatCard
        title={t("totalIssued")}
        value={`${data.totalIssued} ${t("unit.point")}`}
        icon={Star}
        iconBg="bg-yellow-100"
        iconColor="text-yellow-500"
      />
    </StatsRow>
  );
}
