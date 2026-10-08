import React from "react";
import { getTranslations } from "next-intl/server";
import AutoRefresh from "@/shared/components/auto-refresh";

export default async function SentNotificationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("SentNotifications");

  return (
    <main className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#000709]">
          {t("title")}
        </h1>
        <AutoRefresh intervalMs={60000} showButton title={t("refresh")} />
      </div>
      {children}
    </main>
  );
}
