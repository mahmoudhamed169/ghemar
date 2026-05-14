import React from "react";
import { getTranslations } from "next-intl/server";
import CustomerFilters from "./customer-filters";

export default async function CustomerHeaderPage() {
  const t = await getTranslations("customers");
  return (
    <div className="space-y-6 mt-1">
      <h1 className="text-2xl lg:text-3xl font-bold">{t("title")}</h1>
      <CustomerFilters />
    </div>
  );
}
