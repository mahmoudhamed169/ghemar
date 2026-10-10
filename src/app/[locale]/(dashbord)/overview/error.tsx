"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isRateLimitError } from "@/shared/lib/utils/rate-limit-error";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function OverviewError({ error, unstable_retry }: ErrorProps) {
  const t = useTranslations("overview.error");
  const isRateLimit = isRateLimitError(error);

  useEffect(() => {
    console.error("Overview error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center px-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h2 className="text-lg font-semibold text-gray-800">
          {isRateLimit ? t("rateLimitTitle") : t("title")}
        </h2>
        <p className="text-sm text-gray-400 max-w-sm">
          {isRateLimit ? t("rateLimitDescription") : t("description")}
        </p>
        {error.digest && !isRateLimit && (
          <p className="text-xs text-gray-300 font-mono" dir="ltr">
            {error.digest}
          </p>
        )}
      </div>
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
