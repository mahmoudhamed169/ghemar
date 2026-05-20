import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

type BarcodeRow = {
  id: string;
  code: string;
  clientName: string;
  driverName: string;
  createdAt: string;
  lastScan: string;
};

async function getBarcodes(): Promise<BarcodeRow[]> {
  return [
    {
      id: "1",
      code: "BG-2299",
      clientName: "ماريهان رضوان",
      driverName: "ماريهان رضوان",
      createdAt: "12 يناير 2025",
      lastScan: "منذ 3 ساعات",
    },
    {
      id: "2",
      code: "BG-2300",
      clientName: "أحمد الشمري",
      driverName: "سعد الدوسري",
      createdAt: "14 يناير 2025",
      lastScan: "منذ 5 ساعات",
    },
    {
      id: "3",
      code: "BG-2301",
      clientName: "نورة العتيبي",
      driverName: "خالد المطيري",
      createdAt: "18 يناير 2025",
      lastScan: "منذ يوم",
    },
    {
      id: "4",
      code: "BG-2302",
      clientName: "فيصل الحربي",
      driverName: "عمر الزهراني",
      createdAt: "20 يناير 2025",
      lastScan: "منذ يومين",
    },
    {
      id: "5",
      code: "BG-2303",
      clientName: "سارة القحطاني",
      driverName: "محمد الغامدي",
      createdAt: "22 يناير 2025",
      lastScan: "منذ 3 أيام",
    },
    {
      id: "6",
      code: "BG-2304",
      clientName: "عبدالله العمري",
      driverName: "ياسر البقمي",
      createdAt: "25 يناير 2025",
      lastScan: "منذ أسبوع",
    },
    {
      id: "7",
      code: "BG-2305",
      clientName: "منى الرشيدي",
      driverName: "تركي السبيعي",
      createdAt: "28 يناير 2025",
      lastScan: "منذ أسبوعين",
    },
  ];
}

export default async function BarcodeTableBody() {
  const barcodes = await getBarcodes();

  return (
    <TableBody>
      {barcodes.map((row) => (
        <TableRow
          key={row.id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center font-mono font-medium">
            {row.code}
          </TableCell>
          <TableCell className="text-center font-medium">
            {row.clientName}
          </TableCell>
          <TableCell className="text-center font-medium">
            {row.driverName}
          </TableCell>
          <TableCell className="text-center text-gray-600">
            {row.createdAt}
          </TableCell>
          <TableCell className="text-center text-[#E8A838] font-medium">
            {row.lastScan}
          </TableCell>
          <TableCell className="text-center">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 text-sm bg-[#0C6175] text-white border-none hover:bg-[#0C6175]/90"
            >
              <RotateCcw size={14} />
              استبدال
            </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
