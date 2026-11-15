"use server";

import { unstable_rethrow } from "next/navigation";
import { getAppUpdate } from "../../services/settings/get-app-update";
import { AppUpdateSettings } from "../../types/settings/app-update";

/** re-reads the App Store version now (GET ?refresh=true) */
export async function refreshAppUpdateAction(): Promise<{
  success: boolean;
  data?: AppUpdateSettings;
}> {
  try {
    const res = await getAppUpdate(true);
    return { success: true, data: res.data };
  } catch (error) {
    unstable_rethrow(error);
    return { success: false };
  }
}
