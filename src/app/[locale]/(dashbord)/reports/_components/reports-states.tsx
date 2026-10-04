import { CheckCircle, DollarSign, FileText, XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getInvoiceStats } from "@/shared/lib/services/reports/get-invoice-stats";
import StatCard from "@/shared/components/stats/stat-card";
import StatsRow from "@/shared/components/stats/stats-row";
import StatsError from "@/shared/components/stats/stats-error";
import { formatAmount } from "./invoice-modal/invoice-data";

export default async function ReportsStats() {
  const t = await getTranslations("Reports.stats");

  let data: Awaited<ReturnType<typeof getInvoiceStats>>["data"];
  try {
    ({ data } = await getInvoiceStats());
  } catch {
    return <StatsError />;
  }

  return (
    <StatsRow>
      <StatCard
        title={t("totalRevenue")}
        value={`${formatAmount(data.totalRevenue)} ${t("currency")}`}
        icon={DollarSign}
        iconBg="bg-violet-100"
        iconColor="text-violet-500"
      />
      <StatCard
        title={t("invoicesThisMonth")}
        value={String(data.invoicesThisMonth)}
        icon={FileText}
        iconBg="bg-blue-100"
        iconColor="text-blue-500"
      />
      <StatCard
        title={t("paidInvoices")}
        value={String(data.paidInvoices)}
        icon={CheckCircle}
        iconBg="bg-emerald-100"
        iconColor="text-emerald-500"
      />
      <StatCard
        title={t("unpaidInvoices")}
        value={String(data.unpaidInvoices)}
        icon={XCircle}
        iconBg="bg-red-100"
        iconColor="text-red-500"
      />
    </StatsRow>
  );
}
