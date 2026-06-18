import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 text-center px-4">
      <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center">
        <ShieldOff className="w-10 h-10 text-red-400" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-6xl font-bold text-red-400">403</h1>
        <h2 className="text-xl font-semibold text-gray-800">
          غير مصرح لك بالوصول
        </h2>
        <p className="text-sm text-gray-400 max-w-xs">
          ليس لديك صلاحية للوصول إلى هذه الصفحة. تواصل مع المسؤول إذا كنت تعتقد أن هذا خطأ.
        </p>
      </div>

      <Button
        asChild
        className="bg-[#0C6175] hover:bg-[#097188] text-white rounded-xl px-8 h-11"
      >
        <Link href="/ar/overview">العودة للرئيسية</Link>
      </Button>
    </div>
  );
}
