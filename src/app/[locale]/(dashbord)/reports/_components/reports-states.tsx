import { CheckCircle, DollarSign, FileText, XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getInvoiceStats } from "@/shared/lib/services/reports/get-invoice-stats";
import { StatCard } from "./stat-card";

export default async function ReportsStats() {
  const t = await getTranslations("Reports.stats");
  const { data } = await getInvoiceStats();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title={t("totalRevenue")}
        value={`${data.totalRevenue} ${t("currency")}`}
        icon={DollarSign}
        iconClassName="bg-violet-100 text-violet-500"
      />
      <StatCard
        title={t("invoicesThisMonth")}
        value={data.invoicesThisMonth}
        icon={FileText}
        iconClassName="bg-blue-100 text-blue-500"
      />
      <StatCard
        title={t("paidInvoices")}
        value={data.paidInvoices}
        icon={CheckCircle}
        iconClassName="bg-emerald-100 text-emerald-500"
      />
      <StatCard
        title={t("unpaidInvoices")}
        value={data.unpaidInvoices}
        icon={XCircle}
        iconClassName="bg-red-100 text-red-500"
      />
    </div>
  );
}
