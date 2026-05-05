import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DriversTableHeader() {
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
          الاسم
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          رقم الجوال
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          حالة السائق{" "}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          تغيير حالة السائق
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
