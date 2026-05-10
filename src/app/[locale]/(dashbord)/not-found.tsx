// src/app/[locale]/(dashbord)/not-found.tsx

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-[#0C6175]/10 flex items-center justify-center">
        <FileQuestion className="w-10 h-10 text-[#0C6175]" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-[#0C6175]">404</h1>
        <h2 className="text-xl font-semibold text-gray-800">
          الصفحة غير موجودة
        </h2>
        <p className="text-sm text-gray-400 max-w-xs">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
      </div>

      {/* Action */}
      <Button
        asChild
        className="bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl px-8 h-11"
      >
        <Link href="/ar/overview">العودة للرئيسية</Link>
      </Button>
    </div>
  );
}
