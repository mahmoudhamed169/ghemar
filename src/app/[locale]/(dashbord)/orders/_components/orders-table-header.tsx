import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OrdersTableHeader() {
  return (
    <TableHeader>
      <TableRow className=" h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الرقم التسلسلي
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          رقم الطلب
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          اسم السائق
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الأولوية
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          حالة الأوردر
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          تغيير حالة الأوردر
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          اجراء الفرز
        </TableHead>

        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
