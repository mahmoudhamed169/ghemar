import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BranchesTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-100">
        <TableHead className="text-center text-sm font-semibold text-gray-500 w-12">#</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-500">اسم الفرع</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-500">الكود</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-500">المناطق</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-500">الحالة</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-500">إجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
}
