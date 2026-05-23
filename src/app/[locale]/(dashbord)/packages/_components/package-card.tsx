import { SaudiRiyalIcon, ShoppingBag, Waves } from "lucide-react";
import { getTranslations } from "next-intl/server";

import PackageCardActions from "./package-card-actions";
import { Package } from "@/shared/lib/types/packages/package";

interface PackageCardProps {
  pkg: Package;
}

export default async function PackageCard({ pkg }: PackageCardProps) {
  const t = await getTranslations("Packages.card");
  const locale = "ar";

  const name = locale === "ar" ? pkg.nameAr : pkg.name;

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col gap-3 sm:gap-4 min-h-[170px] sm:min-h-[191px]">
      {/* Header */}
      <div className="flex items-start justify-between pb-3 border-b border-[#00000014] gap-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base sm:text-lg font-bold text-[#000709]">
            {name}
          </h3>
          {!pkg.isActive && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-red-50 text-red-500 shrink-0">
              {t("inactive")}
            </span>
          )}
        </div>
        <div className="flex items-center shrink-0">
          <span className="text-xl sm:text-2xl font-bold text-[#000709] me-1">
            {pkg.price.toLocaleString("ar-SA")}
          </span>
          <SaudiRiyalIcon size={16} className="inline-block mb-0.5 sm:mb-1" />
          <span className="text-xs sm:text-sm text-gray-400">
            /{t("month")}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 py-1 sm:py-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#000709]">
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C6175] shrink-0" />
          <span>
            {pkg.bagCount} {t("bagsPerMonth")}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#000709]">
          <Waves className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C6175] shrink-0" />
          <span>
            {pkg.expressWashCount} {t("expressWash")}
          </span>
        </div>
      </div>

      <PackageCardActions pkg={pkg} />
    </div>
  );
}
