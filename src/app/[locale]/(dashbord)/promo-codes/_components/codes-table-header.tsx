import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function CodesTableHeader() {
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
          كود الخصم 
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          القيمة 
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الحد الأقصي
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الاستخدام
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
           تاريخ الانتهاء
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          الحالة
        </TableHead>
   
        <TableHead className="text-center font-semibold text-[#6A7282]">
        
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
