import { getTranslations } from "next-intl/server";
import { getNotificationSettings } from "@/shared/lib/services/settings/get-notification-settings";
import AlertsForm from "./alerts";

export default async function AlertSettings() {
  const [t, { data }] = await Promise.all([
    getTranslations("Settings.general.alertSettings"),
    getNotificationSettings(),
  ]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>
      <AlertsForm initialData={data} />
    </section>
  );
}
