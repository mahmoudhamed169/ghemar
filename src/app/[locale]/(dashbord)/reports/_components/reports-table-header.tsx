import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportsTableHeader() {
  return (
    <TableHeader>
      <TableRow className=" h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الرقم التسلسلي
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          ID
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          رقم الطلب
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          اسم العميل
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الباقة
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          التاريخ
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          المبلغ المدفوع
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الخصم
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          حالة الطلب
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
