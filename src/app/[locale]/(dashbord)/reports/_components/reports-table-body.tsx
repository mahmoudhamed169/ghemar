import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getLocale, getTranslations } from "next-intl/server";

import { Invoice } from "@/shared/lib/types/reports/invoice";
import OrderStatusBadge from "./order-status-badge";
import { InvoiceModalTrigger } from "./invoice-modal";
import {
  formatInvoiceDate,
  getInvoicePackageName,
  mapInvoiceToInvoiceData,
} from "./invoice-modal/invoice-data";

interface ReportsTableBodyProps {
  invoices: Invoice[];
  page: number;
  limit: number;
}

export default async function ReportsTableBody({
  invoices,
  page,
  limit,
}: ReportsTableBodyProps) {
  const locale = await getLocale();
  const t = await getTranslations("Reports");

  if (!invoices.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={10} className="h-28 text-center text-gray-500">
            {t("table.empty")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {invoices.map((invoice, index) => (
        <TableRow
          key={invoice._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {(page - 1) * limit + index + 1}
          </TableCell>
          <TableCell className="text-center font-medium whitespace-nowrap">
            {invoice._id}
          </TableCell>
          <TableCell className="text-center font-medium whitespace-nowrap">
            {invoice.orderId || "-"}
          </TableCell>
          <TableCell className="text-center font-medium whitespace-nowrap">
            {invoice.user?.name || "-"}
          </TableCell>
          <TableCell className="text-center whitespace-nowrap">
            {getInvoicePackageName(invoice, locale)}
          </TableCell>
          <TableCell className="text-center text-gray-600 whitespace-nowrap">
            {formatInvoiceDate(invoice.createdAt, locale)}
          </TableCell>
          <TableCell className="text-center font-medium whitespace-nowrap">
            {invoice.amount} {invoice.currency}
          </TableCell>
          <TableCell className="text-center text-gray-600 whitespace-nowrap">
            {invoice.discountAmount || 0} {invoice.currency}
          </TableCell>
          <TableCell className="text-center">
            <OrderStatusBadge status={invoice.status} />
          </TableCell>
          <TableCell className="text-center">
            <InvoiceModalTrigger
              invoiceId={invoice._id}
              invoice={mapInvoiceToInvoiceData(invoice, locale)}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
