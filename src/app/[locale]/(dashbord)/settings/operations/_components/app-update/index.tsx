import { getTranslations } from "next-intl/server";
import { unstable_rethrow } from "next/navigation";
import { getAppUpdate } from "@/shared/lib/services/settings/get-app-update";
import AppUpdateForm from "./app-update-form";

export default async function AppUpdateSettings() {
  const [t, data] = await Promise.all([
    getTranslations("Settings.operations.appUpdate"),
    getAppUpdate()
      .then((res) => res.data)
      .catch((error) => {
        unstable_rethrow(error);
        return null;
      }),
  ]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("title")}</h2>
      <p className="text-sm text-gray-500 mb-6">{t("description")}</p>
      {data ? (
        <AppUpdateForm initialData={data} />
      ) : (
        <p className="text-sm text-red-500">{t("loadError")}</p>
      )}
    </section>
  );
}
