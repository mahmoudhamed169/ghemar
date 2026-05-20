import { getTranslations } from "next-intl/server";
import DriverFilters from "./driver-filters";
import AddDriverButton from "./add-driver/add-driver-button";

export default async function DriverHeaderPage() {
  const t = await getTranslations("drivers");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("header.title")}</h1>
        <AddDriverButton />
      </div>
      <DriverFilters />
    </div>
  );
}
