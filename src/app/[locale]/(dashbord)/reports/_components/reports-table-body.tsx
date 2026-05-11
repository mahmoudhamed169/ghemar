import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import OrderStatusBadge, { type OrderStatus } from "./order-status-badge";
import { InvoiceModalTrigger } from "./invoice-modal";

type Report = {
  serial: number;
  id: string;
  orderNumber: number;
  clientName: string;
  package: string;
  date: string;
  amountPaid: number;
  discount: number;
  status: OrderStatus;
};

async function getReports(): Promise<Report[]> {
  const statuses: OrderStatus[] = [
    "مستعجل",
    "مستعجل",
    "مستعجل",
    "مستعجل",
    "عادي",
    "عادي",
    "عادي",
  ];

  const packages = [
    "الذهبية",
    "الفضية",
    "الأساسية",
    "الأساسية",
    "الأساسية",
    "الأساسية",
    "الأساسية",
  ];

  return Array.from({ length: 7 }, (_, i) => ({
    serial: i + 1,
    id: "INV-66788",
    orderNumber: 66788,
    clientName: "ماريهان رضوان",
    package: packages[i],
    date: "12 يناير 2026",
    amountPaid: i < 4 ? 115 : 100,
    discount: 10,
    status: statuses[i],
  }));
}

export default async function ReportsTableBody() {
  const reports = await getReports();

  return (
    <TableBody>
      {reports.map((report) => (
        <TableRow
          key={report.serial}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {report.serial}
          </TableCell>
          <TableCell className="text-center font-medium">{report.id}</TableCell>
          <TableCell className="text-center font-medium">
            {report.orderNumber}
          </TableCell>
          <TableCell className="text-center font-medium">
            {report.clientName}
          </TableCell>
          <TableCell className="text-center">{report.package}</TableCell>
          <TableCell className="text-center text-gray-600">
            {report.date}
          </TableCell>
          <TableCell className="text-center font-medium">
            {report.amountPaid} ريال
          </TableCell>
          <TableCell className="text-center text-gray-600">
            {report.discount} ريال
          </TableCell>
          <TableCell className="text-center">
            <OrderStatusBadge status={report.status} />
          </TableCell>
          <TableCell className="text-center">
            <InvoiceModalTrigger
              invoice={{
                invoiceId: "2345",
                clientName: report.clientName,
                orderNumber: report.orderNumber,
                driverName: "سعد الدوسري",
                date: report.date,
                baseAmount: 290.25,
                discount: report.discount,
                vatPercent: 14,
                total: report.amountPaid,
              }}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
