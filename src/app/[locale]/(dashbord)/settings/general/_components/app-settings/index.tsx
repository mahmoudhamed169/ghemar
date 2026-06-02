import { getGeneralSettings } from "@/shared/lib/services/settings/get-general-settings";
import AppSettingsCard from "./app-settings-card";

export default async function AppSettings() {
  const { data } = await getGeneralSettings();
  return <AppSettingsCard initialData={data} />;
}
