import { getPromoCodeStats } from "@/shared/lib/services/promocode/get-promo-code-stats";
import { TicketPercent, BadgePercent, Users2, Ban } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function OffersStat() {
  const t = await getTranslations("PromoCodes.stats");

  const { data } = await getPromoCodeStats();

  const stats = [
    {
      label: t("totalPromoCodes"),
      value: data.totalPromoCodes,
      icon: TicketPercent,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: t("activePromoCodes"),
      value: data.activePromoCodes,
      icon: BadgePercent,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: t("totalUsage"),
      value: data.totalUsage,
      icon: Users2,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: t("expiredPromoCodes"),
      value: data.expiredPromoCodes,
      icon: Ban,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white min-h-[77px] rounded-2xl px-4 sm:px-5 py-4 flex items-center gap-3 shadow-sm border border-gray-100"
        >
          <div
            className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl ${stat.iconBg} flex items-center justify-center`}
          >
            <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.iconColor}`} />
          </div>
          <div className="text-right space-y-0.5 min-w-0">
            <p className="text-xl sm:text-2xl font-bold text-[#000709]">
              {stat.value}
            </p>
            <p className="text-xs sm:text-sm text-gray-400 truncate">
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
