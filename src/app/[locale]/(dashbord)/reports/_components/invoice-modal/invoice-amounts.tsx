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
      className={`flex items-center justify-between py-2 ${
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
        className={`text-sm ${
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
  const vat = ((baseAmount - discount) * vatPercent) / 100;

  return (
    <div className="border-t border-gray-100 pt-3 space-y-0.5">
      <AmountRow label="المبلغ الأساسي" value={`﷼ ${baseAmount.toFixed(2)}`} />
      <AmountRow label="الخصم" value={`﷼ ${discount}`} />
      <AmountRow
        label={`ضريبة القيمة المضافة (%${vatPercent})`}
        value={`﷼ ${vat.toFixed(2)}`}
      />
      <AmountRow label="الإجمالي" value={`﷼ ${total}`} isTotal />
    </div>
  );
}
