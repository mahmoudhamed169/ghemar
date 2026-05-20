import { getTranslations } from "next-intl/server";

export default async function PageTitle() {
  const t = await getTranslations("orders");
  return <h1 className="text-3xl font-bold">{t("title")}</h1>;
}
