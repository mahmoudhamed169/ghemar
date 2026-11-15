import { Gift, SaudiRiyalIcon, ShoppingBag, Star, Tag } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";

import PackageCardActions from "./package-card-actions";
import { Package } from "@/shared/lib/types/packages/package";

interface PackageCardProps {
  pkg: Package;
}

export default async function PackageCard({ pkg }: PackageCardProps) {
  const t = await getTranslations("Packages.card");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const numberLocale = isAr ? "ar-SA" : "en-US";

  // fall back to the other language when only one was filled in
  const name = (isAr ? pkg.nameAr : pkg.name) || pkg.nameAr || pkg.name;
  const description = (isAr ? pkg.descriptionAr : pkg.description) || pkg.descriptionAr || pkg.description;
  const freeGift = (isAr ? pkg.freeGiftAr : pkg.freeGift) || pkg.freeGiftAr || pkg.freeGift;

  const savingsValue = pkg.savingsValue ? pkg.savingsValue.toLocaleString(numberLocale) : null;
  const savingsLabel = savingsValue
    ? pkg.savingsType === "percent"
      ? t("savingsPercent", { value: savingsValue })
      : t("savingsAmount", { value: savingsValue })
    : null;

  return (
    <div
      className={`relative bg-white rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col gap-3 sm:gap-4 min-h-[170px] sm:min-h-[191px] ${
        pkg.isMostPopular
          ? "border-2 border-[#0C6175] ring-4 ring-[#0C6175]/10"
          : "border border-gray-100"
      }`}
    >
      {pkg.isMostPopular && (
        <span className="absolute -top-3 start-4 inline-flex items-center gap-1 rounded-full bg-[#0C6175] px-3 py-1 text-xs font-semibold text-white shadow-sm">
          <Star className="w-3 h-3 fill-current" />
          {t("mostPopular")}
        </span>
      )}

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
            {pkg.price.toLocaleString(numberLocale)}
          </span>
          <SaudiRiyalIcon size={16} className="inline-block mb-0.5 sm:mb-1" />
          <span className="text-xs sm:text-sm text-gray-400">
            /{t("month")}
          </span>
        </div>
      </div>

      {description && (
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2" title={description}>
          {description}
        </p>
      )}

      {/* Details */}
      <div className="flex flex-col gap-2 py-1 sm:py-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#000709]">
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C6175] shrink-0" />
          <span>
            {pkg.bagCount} {t("bagsPerMonth")}
          </span>
        </div>

        {(savingsLabel || freeGift) && (
          <div className="flex flex-wrap items-center gap-2">
            {savingsLabel && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <Tag className="w-3 h-3" />
                {savingsLabel}
              </span>
            )}
            {freeGift && (
              <span
                className="inline-flex max-w-full items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
                title={freeGift}
              >
                <Gift className="w-3 h-3 shrink-0" />
                <span className="truncate">{freeGift}</span>
              </span>
            )}
          </div>
        )}
      </div>

      <PackageCardActions pkg={pkg} />
    </div>
  );
}
