import { getPackageStats } from "@/shared/lib/services/packages/get-package-stats";
import { Package, PackageCheck, TrendingUp, PackageOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

export default async function PackagesStats() {
  const t = await getTranslations("Packages.stats");

  let data: Awaited<ReturnType<typeof getPackageStats>>["data"];
  try {
    ({ data } = await getPackageStats());
  } catch {
    return <StatsError />;
  }

  return (
    <StatsRow>
      <StatCard
        title={t("totalPackages")}
        value={String(data.totalPackages)}
        icon={Package}
        iconBg="bg-blue-50"
        iconColor="text-blue-500"
      />
      <StatCard
        title={t("activePackages")}
        value={String(data.activePackages)}
        icon={PackageCheck}
        iconBg="bg-green-50"
        iconColor="text-green-500"
      />
      <StatCard
        title={t("activeSubscriptions")}
        value={String(data.activeSubscriptions)}
        icon={TrendingUp}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
      <StatCard
        title={t("revenue")}
        value={`${data.revenue.toLocaleString("ar-SA")} ${t("currency")}`}
        icon={PackageOpen}
        iconBg="bg-teal-50"
        iconColor="text-[#0C6175]"
      />
    </StatsRow>
  );
}
