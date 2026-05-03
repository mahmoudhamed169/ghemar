import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CustomersTableHeader() {
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
          رقم الهاتف
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          نوع الباقة
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]"></TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          إجراءات
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
