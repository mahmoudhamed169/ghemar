"use client";

import { useTranslations } from "next-intl";

export default function ZoneStatusBadge({ isActive }: { isActive: boolean }) {
  const t = useTranslations("Zones.status");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium border ${
        isActive
          ? "border-green-500 text-green-500"
          : "border-red-500 text-red-500"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${isActive ? "bg-green-500" : "bg-red-500"}`} />
      {isActive ? t("active") : t("inactive")}
    </span>
  );
}
