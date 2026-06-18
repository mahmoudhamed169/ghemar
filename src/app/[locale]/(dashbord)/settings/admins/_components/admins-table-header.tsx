import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-gray-50 border-b border-gray-100">
        <TableHead className="text-center text-sm font-semibold text-gray-600 py-4">#</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">الاسم</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">رقم الهاتف</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">الدور</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">الفرع</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">الحالة</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">تاريخ الإنشاء</TableHead>
        <TableHead className="text-center text-sm font-semibold text-gray-600">الإجراءات</TableHead>
      </TableRow>
    </TableHeader>
  );
}
