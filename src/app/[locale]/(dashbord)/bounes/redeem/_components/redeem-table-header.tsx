import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function RedeemTableHeader() {
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
          اسم المستخدم
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          رقم الجوال
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          النقاط المستخدمة
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الأكياس المضافة
        </TableHead>

        <TableHead className="text-center font-semibold text-[#6A7282]">
          التاريخ والوقت
        </TableHead>

        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
