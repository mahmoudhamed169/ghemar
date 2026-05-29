import { useTranslations } from "next-intl";

interface InvoiceInfoGridProps {
  clientName: string;
  orderNumber: number | string;
  driverName: string;
  date: string;
}

function InfoCell({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1 border border-dashed border-gray-200 rounded-lg p-3">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-800 break-words">
        {value}
      </span>
    </div>
  );
}

export default function InvoiceInfoGrid({
  clientName,
  orderNumber,
  driverName,
  date,
}: InvoiceInfoGridProps) {
  const t = useTranslations("Reports.invoice");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      <InfoCell label={t("orderNumber")} value={orderNumber} />
      <InfoCell label={t("clientName")} value={clientName} />
      <InfoCell label={t("date")} value={date} />
      <InfoCell label={t("paymentMethod")} value={driverName} />
    </div>
  );
}
