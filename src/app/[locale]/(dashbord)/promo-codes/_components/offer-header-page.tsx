import PromoCodeBtn from "./promo-code-btn";
import { getTranslations } from "next-intl/server";

export default async function OffersHeaderPage() {
  const t = await getTranslations("PromoCodes.header");

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl sm:text-3xl font-bold">{t("title")}</h1>
      <PromoCodeBtn />
    </div>
  );
}