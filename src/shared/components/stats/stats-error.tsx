"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AlertTriangle, RefreshCw } from "lucide-react";

/** shown in place of a stats row when its data could not be loaded */
export default function StatsError() {
  const t = useTranslations("stats");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className="bg-white flex flex-wrap items-center justify-between gap-3"
      style={{
        borderRadius: "12px",
        padding: "16px 21px",
        border: "0.67px solid #0000001F",
      }}
    >
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        {t("error")}
      </div>
      <button
        onClick={() => startTransition(() => router.refresh())}
        disabled={isPending}
        className="flex items-center gap-1.5 text-sm font-medium text-[#0C6175] hover:underline disabled:opacity-50"
      >
        <RefreshCw className={`w-4 h-4 ${isPending ? "animate-spin" : ""}`} />
        {t("retry")}
      </button>
    </div>
  );
}
