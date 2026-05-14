import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";

export default async function CustomersTableHeader() {
  const t = await getTranslations("customers.table");
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
          {t("name")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("phone")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("packageType")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
         
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
