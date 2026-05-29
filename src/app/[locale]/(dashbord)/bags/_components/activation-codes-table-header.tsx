import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ActivationCodesTableHeader() {
  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">الكود</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">الباقة</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">الحالة</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">بواسطة</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">العميل</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">تاريخ الإنشاء</TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
}
