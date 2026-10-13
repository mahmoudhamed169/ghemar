import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getTranslations } from "next-intl/server";
import { SelectAllCheckbox } from "./labels/customers-selection";

export default async function CustomersTableHeader() {
  const t = await getTranslations("customers.table");
  return (
    <TableHeader>
      <TableRow className="h-15">
        <TableHead className="w-10 text-center">
          <SelectAllCheckbox label={t("selectAll")} />
        </TableHead>
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
          {t("branch")}
        </TableHead>
        <TableHead className="text-center font-semibold text-[#6A7282]">
          {t("area")}
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
