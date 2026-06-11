import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { Bag } from "@/shared/lib/types/bags/bag";
import BagStatusBadge from "./bag-status-badge";
import BagReplaceButton from "./bag-replace-button";

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const date = d.toLocaleDateString("ar-SA", { year: "numeric", month: "short", day: "numeric" });
  const time = d.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
  return { date, time };
}

interface BarcodeTableBodyProps {
  bags: Bag[];
}

export default async function BarcodeTableBody({ bags }: BarcodeTableBodyProps) {
  const t = await getTranslations("Bags.table");

  if (!bags?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="text-center py-16 text-gray-400">
            {t("empty")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {bags.map((bag) => {
        const { date, time } = formatDate(bag.createdAt);
        return (
        <TableRow
          key={bag._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          {/* Barcode */}
          <TableCell className="text-center font-mono font-medium text-sm tracking-wider">
            {bag.barcode}
          </TableCell>

          {/* Status */}
          <TableCell className="text-center">
            <BagStatusBadge status={bag.status} />
          </TableCell>

          {/* Client */}
          <TableCell className="text-center">
            {bag.assignedTo ? (
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-medium text-sm">{bag.assignedTo.name}</span>
                <span className="text-xs text-gray-400">{bag.assignedTo.phone}</span>
              </div>
            ) : (
              <span className="text-gray-300 text-sm">—</span>
            )}
          </TableCell>

          {/* Driver */}
          <TableCell className="text-center">
            {bag.currentOrderId?.driver ? (
              <span className="font-medium text-sm">
                {bag.currentOrderId.driver.name}
              </span>
            ) : (
              <span className="text-gray-300 text-sm">—</span>
            )}
          </TableCell>

          {/* Order */}
          <TableCell className="text-center">
            {bag.currentOrderId ? (
              <span className="font-mono text-xs text-[#0C6175] font-medium">
                {bag.currentOrderId.orderNumber}
              </span>
            ) : (
              <span className="text-gray-300 text-sm">—</span>
            )}
          </TableCell>

          {/* Created At */}
          <TableCell className="text-center">
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-sm text-gray-700">{date}</span>
              <span className="text-xs text-gray-400">{time}</span>
            </div>
          </TableCell>

          {/* Actions */}
          <TableCell className="text-center">
            <BagReplaceButton bagId={bag._id} barcode={bag.barcode} />
          </TableCell>
        </TableRow>
        );
      })}
    </TableBody>
  );
}