interface InvoiceInfoGridProps {
  clientName: string;
  orderNumber: number | string;
  driverName: string;
  date: string;
}

function InfoCell({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex flex-col gap-1 border border-dashed border-gray-200 rounded-lg p-3">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

export default function InvoiceInfoGrid({
  clientName,
  orderNumber,
  driverName,
  date,
}: InvoiceInfoGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <InfoCell label="رقم الطلب" value={orderNumber} />
      <InfoCell label="اسم العميل" value={clientName} />
      <InfoCell label="التاريخ" value={date} />
      <InfoCell label="السائق" value={driverName} />
    </div>
  );
}