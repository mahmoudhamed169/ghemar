"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function SentNotificationsError({ error, unstable_retry }: ErrorProps) {
  const t = useTranslations("SentNotifications");

  useEffect(() => {
    console.error("Sent notifications error:", error);
  }, [error]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-5 text-center px-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{t("error")}</h2>
      <Button
        onClick={() => unstable_retry()}
        className="bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl px-6 h-11 flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        {t("retry")}
      </Button>
    </div>
  );
}
