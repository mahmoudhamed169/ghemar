import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function CodesTableHeader() {
  const t = await getTranslations("PromoCodes.table.headers");

  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("serial")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("id")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("code")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("value")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("maxLimit")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("usage")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("expiryDate")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("status")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]" />
      </TableRow>
    </TableHeader>
  );
}
