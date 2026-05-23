import { getPackageStats } from "@/shared/lib/services/packages/get-package-stats";
import { Package, PackageCheck, TrendingUp, PackageOpen } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function PackagesStats() {
  const t = await getTranslations("Packages.stats");
  const { data } = await getPackageStats();

  const stats = [
    {
      label: t("totalPackages"),
      value: data.totalPackages,
      icon: Package,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: t("activePackages"),
      value: data.activePackages,
      icon: PackageCheck,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: t("activeSubscriptions"),
      value: data.activeSubscriptions,
      icon: TrendingUp,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: t("revenue"),
      value: `${data.revenue.toLocaleString("ar-SA")} ${t("currency")}`,
      icon: PackageOpen,
      iconBg: "bg-teal-50",
      iconColor: "text-[#0C6175]",
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
