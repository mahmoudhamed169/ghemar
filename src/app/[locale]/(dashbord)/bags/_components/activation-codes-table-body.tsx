import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ActivationCode } from "@/shared/lib/types/bags/activation-code";
import ActivationCodePrintButton from "./activation-code-print-button";

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

interface ActivationCodesTableBodyProps {
  codes: ActivationCode[];
}

export default function ActivationCodesTableBody({
  codes,
}: ActivationCodesTableBodyProps) {
  if (!codes?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="text-center py-16 text-gray-400">
            لا توجد أكواد تفعيل
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {codes.map((item) => (
        <TableRow
          key={item._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          {/* Code */}
          <TableCell className="text-center font-mono font-medium text-sm tracking-wider">
            {item.code}
          </TableCell>

          {/* Package */}
          <TableCell className="text-center text-sm">
            {item.packageId.name}
          </TableCell>

          {/* Status */}
          <TableCell className="text-center">
            <span
              className={
                item.isUsed
                  ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600"
                  : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"
              }
            >
              {item.isUsed ? "مستخدم" : "متاح"}
            </span>
          </TableCell>

          {/* Created By */}
          <TableCell className="text-center text-sm text-gray-600">
            {item.createdBy.name}
          </TableCell>

          {/* Used By */}
          <TableCell className="text-center">
            {item.usedBy ? (
              <div className="flex flex-col items-center gap-0.5">
                <span className="font-medium text-sm">{item.usedBy.name}</span>
                <span className="text-xs text-gray-400">{item.usedBy.phone}</span>
              </div>
            ) : (
              <span className="text-gray-300 text-sm">—</span>
            )}
          </TableCell>

          {/* Created At */}
          <TableCell className="text-center text-gray-600 text-sm">
            {formatDate(item.createdAt)}
          </TableCell>

          {/* Actions */}
          <TableCell className="text-center">
            <ActivationCodePrintButton code={item.code} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
