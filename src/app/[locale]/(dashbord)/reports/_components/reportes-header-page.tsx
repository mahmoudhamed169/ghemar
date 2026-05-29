import { getTranslations } from "next-intl/server";

export default async function ReportesHeaderPage() {
  const t = await getTranslations("Reports");

  return <h1 className="text-2xl sm:text-3xl font-bold">{t("title")}</h1>;
}
