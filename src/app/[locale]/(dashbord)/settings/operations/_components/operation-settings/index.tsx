import { getTranslations } from "next-intl/server";
import { getOperationalSettings } from "@/shared/lib/services/settings/get-operational-settings";
import OperationalForm from "./alerts";

export default async function OpSettings() {
  const [t, { data }] = await Promise.all([
    getTranslations("Settings.operations.operationalSettings"),
    getOperationalSettings(),
  ]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>
      <OperationalForm initialData={data} />
    </section>
  );
}
