import { getTranslations } from "next-intl/server";
import DriverFilters from "./driver-filters";
import AddDriverButton from "./add-driver/add-driver-button";

export default async function DriverHeaderPage() {
  const t = await getTranslations("drivers");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold">{t("header.title")}</h1>
        <AddDriverButton />
      </div>
      <DriverFilters />
    </div>
  );
}
