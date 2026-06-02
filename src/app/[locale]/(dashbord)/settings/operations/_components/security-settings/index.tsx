import { getTranslations } from "next-intl/server";
import { getSecuritySettings } from "@/shared/lib/services/settings/get-security-settings";
import SecurityForm from "./alerts";
import LogoutAllSessionsButton from "./logout-all-sessions-button";

export default async function SecSettings() {
  const [t, { data }] = await Promise.all([
    getTranslations("Settings.operations.securitySettings"),
    getSecuritySettings(),
  ]);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{t("title")}</h2>
      <div className="space-y-6">
        <SecurityForm initialData={data} />
        <LogoutAllSessionsButton />
      </div>
    </section>
  );
}
