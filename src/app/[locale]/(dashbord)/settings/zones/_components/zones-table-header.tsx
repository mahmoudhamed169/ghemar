import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ZonesTableHeader() {
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
          اسم المنطقة
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          السائقون
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الطلبات
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          تاريخ الاضافة{" "}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الحالة{" "}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]"></TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الإجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
