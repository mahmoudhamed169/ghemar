import { useTranslations } from "next-intl";

interface InvoiceHeaderProps {
  invoiceId: string;
}

export default function InvoiceHeader({ invoiceId }: InvoiceHeaderProps) {
  const t = useTranslations("Reports.invoice");

  return (
    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-900 mt-5">
        {t("title")} #{invoiceId}
      </h2>
    </div>
  );
}
