import { getPromoCodeStats } from "@/shared/lib/services/promocode/get-promo-code-stats";
import { TicketPercent, BadgePercent, Users2, Ban } from "lucide-react";
import { getTranslations } from "next-intl/server";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";

export default async function OffersStat() {
  const t = await getTranslations("PromoCodes.stats");

  let data: Awaited<ReturnType<typeof getPromoCodeStats>>["data"];
  try {
    ({ data } = await getPromoCodeStats());
  } catch {
    return <StatsError />;
  }

  return (
    <StatsRow>
      <StatCard
        title={t("totalPromoCodes")}
        value={String(data.totalPromoCodes)}
        icon={TicketPercent}
        iconBg="bg-blue-50"
        iconColor="text-blue-500"
      />
      <StatCard
        title={t("activePromoCodes")}
        value={String(data.activePromoCodes)}
        icon={BadgePercent}
        iconBg="bg-green-50"
        iconColor="text-green-500"
      />
      <StatCard
        title={t("totalUsage")}
        value={String(data.totalUsage)}
        icon={Users2}
        iconBg="bg-orange-50"
        iconColor="text-orange-500"
      />
      <StatCard
        title={t("expiredPromoCodes")}
        value={String(data.expiredPromoCodes)}
        icon={Ban}
        iconBg="bg-red-50"
        iconColor="text-red-500"
      />
    </StatsRow>
  );
}
