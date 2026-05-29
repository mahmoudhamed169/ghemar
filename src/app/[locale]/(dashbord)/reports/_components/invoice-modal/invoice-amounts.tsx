import { useTranslations } from "next-intl";

interface InvoiceAmountsProps {
  baseAmount: number;
  discount: number;
  vatPercent: number;
  total: number;
}

function AmountRow({
  label,
  value,
  isTotal,
}: {
  label: string;
  value: string;
  isTotal?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-2 ${
        isTotal ? "border-t border-gray-100 mt-1 pt-3" : ""
      }`}
    >
      <span
        className={`text-sm font-semibold ${
          isTotal ? "text-gray-900 text-base" : "text-gray-700"
        }`}
      >
        {value}
      </span>
      <span
        className={`text-sm text-end ${
          isTotal ? "text-gray-500 font-medium" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export default function InvoiceAmounts({
  baseAmount,
  discount,
  vatPercent,
  total,
}: InvoiceAmountsProps) {
  const t = useTranslations("Reports.invoice");
  const vat = ((baseAmount - discount) * vatPercent) / 100;

  return (
    <div className="border-t border-gray-100 pt-3 space-y-0.5">
      <AmountRow label={t("baseAmount")} value={baseAmount.toFixed(2)} />
      <AmountRow label={t("discount")} value={String(discount)} />
      <AmountRow label={`${t("vat")} (%${vatPercent})`} value={vat.toFixed(2)} />
      <AmountRow label={t("total")} value={String(total)} isTotal />
    </div>
  );
}
