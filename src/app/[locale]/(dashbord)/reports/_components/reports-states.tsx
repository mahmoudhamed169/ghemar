import { XCircle, CheckCircle, FileText, DollarSign } from "lucide-react";
import { StatCard } from "./stat-card";

export default function ReportsStats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* إجمالي الإيرادات */}
      <StatCard
        title="إجمالي الإيرادات"
        value="3,855 ر.س"
        icon={DollarSign}
        iconClassName="bg-violet-100 text-violet-500"
        trend={{
          value: "12.4%",
          direction: "up",
          label: "مقارنة بالشهر الماضي",
        }}
      />

      {/* عدد الفواتير هذا الشهر */}
      <StatCard
        title="عدد الفواتير هذا الشهر"
        value={15}
        icon={FileText}
        iconClassName="bg-blue-100 text-blue-500"
        trend={{
          value: "8.1%",
          direction: "up",
          label: "مقارنة بالشهر الماضي",
        }}
      />

      {/* الفواتير المدفوعة */}
      <StatCard
        title="الفواتير المدفوعة"
        value={8}
        icon={CheckCircle}
        iconClassName="bg-emerald-100 text-emerald-500"
        trend={{
          value: "5.3%",
          direction: "up",
          label: "مقارنة بالشهر الماضي",
        }}
      />

      {/* الفواتير غير المدفوعة */}
      <StatCard
        title="الفواتير غير المدفوعة"
        value={7}
        icon={XCircle}
        iconClassName="bg-red-100 text-red-500"
        trend={{
          value: "2.1%",
          direction: "down",
          label: "مقارنة بالشهر الماضي",
        }}
      />
    </div>
  );
}
