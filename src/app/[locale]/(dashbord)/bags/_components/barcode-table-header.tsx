import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BarcodeTableHeader() {
  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الباركود
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          العميل
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          السائق
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          تاريخ الانشاء
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          اخر مسح
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
