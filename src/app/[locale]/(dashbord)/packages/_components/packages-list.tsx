import { getTranslations } from "next-intl/server";
import { Package as PackageIcon } from "lucide-react";
import PackageCard from "./package-card";
import { getPackages } from "@/shared/lib/services/packages/get-packages";

export default async function PackagesList() {
  const t = await getTranslations("Packages");
  const { data: packages } = await getPackages();

  if (!packages?.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 sm:py-20 gap-4">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gray-50 flex items-center justify-center">
          <PackageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-gray-300" />
        </div>
        <p className="text-gray-400 text-sm">{t("empty")}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {packages.map((pkg) => (
        <PackageCard key={pkg._id} pkg={pkg} />
      ))}
    </div>
  );
}
