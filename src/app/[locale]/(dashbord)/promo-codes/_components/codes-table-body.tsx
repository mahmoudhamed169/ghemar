import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import CodeStatusBadge from "./code-status-badge";
import ActiveToggle from "./active-toggle";
import EditCodeButton from "./edit-discount-code/edit-code-button";
import { getPromoCodes } from "@/shared/lib/services/promocode/get-promo-codes";

function formatExpiryDate(dateStr: string, locale: string): string {
  return new Date(dateStr).toLocaleDateString(
    locale === "ar" ? "ar-SA" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );
}

function formatDiscountValue(
  type: "percentage" | "fixed",
  value: number,
): string {
  return type === "percentage" ? `${value}%` : `${value} ﷼`;
}

export default async function CodesTableBody() {
  const t = await getTranslations("PromoCodes.table");
  const { data: codes } = await getPromoCodes();

  if (!codes?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={9} className="text-center py-16 text-gray-400">
            {t("empty")}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {codes.map((code, index) => (
        <TableRow
          key={code._id}
          className="hover:bg-gray-50 h-20 text-[#000709] border-b border-gray-100"
        >
          <TableCell className="text-center text-sm text-gray-500">
            {index + 1}
          </TableCell>
          <TableCell className="text-center font-medium text-xs text-gray-400">
            {code._id.slice(-6).toUpperCase()}
          </TableCell>
          <TableCell className="text-center font-semibold tracking-widest">
            {code.code}
          </TableCell>
          <TableCell className="text-center font-medium">
            {formatDiscountValue(code.discountType, code.discountValue)}
          </TableCell>
          <TableCell className="text-center text-gray-600">
            {code.maxUsagePerUser} {t("usageUnit")}
          </TableCell>
          <TableCell className="text-center text-gray-600">
            {code.currentUsage}
          </TableCell>
          <TableCell className="text-center text-gray-600">
            {formatExpiryDate(code.expiryDate, "ar")}
          </TableCell>
          <TableCell className="text-center">
            <CodeStatusBadge status={code.isActive ? "نشط" : "موقوف"} />
          </TableCell>
          <TableCell className="text-center">
            <div className="flex items-center justify-center gap-2">
              <EditCodeButton promoCode={code} />
              <ActiveToggle id={code._id} isActive={code.isActive} />
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
}
