import { getTranslations } from "next-intl/server";
import { Info } from "lucide-react";
import { SentNotificationsResponse } from "@/shared/lib/types/notifications/sent-notification";

export default async function RetentionNote({
  response,
}: {
  response: Promise<SentNotificationsResponse>;
}) {
  const t = await getTranslations("SentNotifications");
  const { retentionDays } = await response;

  return (
    <p className="flex items-center gap-2 text-sm text-gray-500">
      <Info className="w-4 h-4 shrink-0 text-[#0C6175]" />
      {t("retentionNote", { days: retentionDays })}
    </p>
  );
}
