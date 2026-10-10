"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { isRateLimitError } from "@/shared/lib/utils/rate-limit-error";

interface ErrorProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

export default function DashboardError({ error, unstable_retry }: ErrorProps) {
  const router = useRouter();
  const isRateLimit = isRateLimitError(error);

  useEffect(() => {
    console.error("Dashboard error:", error.message);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-amber-50 flex items-center justify-center">
        <AlertTriangle className="w-10 h-10 text-amber-400" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-amber-400">
          {isRateLimit ? "429" : "خطأ"}
        </h1>
        <h2 className="text-xl font-semibold text-gray-800">
          {isRateLimit ? "طلبات كثيرة، حاول بعد قليل" : "حدث خطأ غير متوقع"}
        </h2>
        <p className="text-sm text-gray-400 max-w-xs">
          {isRateLimit
            ? "الخادم يقيّد الطلبات مؤقتاً. انتظر لحظة ثم أعد المحاولة."
            : error.message}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => unstable_retry()}
          className="bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl px-6 h-11 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          إعادة المحاولة
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/ar/overview")}
          className="rounded-xl px-6 h-11"
        >
          الرئيسية
        </Button>
      </div>
    </div>
  );
}
