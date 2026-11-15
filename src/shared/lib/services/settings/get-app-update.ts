import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { AppUpdateResponse } from "../../types/settings/app-update";

/** refresh = re-read the App Store now instead of the 30-minute cache */
export async function getAppUpdate(refresh = false): Promise<AppUpdateResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/app-update${refresh ? "?refresh=true" : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // client counts change on every app launch, so never cache
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch app update settings: ${res.status}`);

  return res.json();
}
