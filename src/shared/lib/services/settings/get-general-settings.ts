import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { GeneralSettingsResponse } from "../../types/settings/general-settings";

export async function getGeneralSettings(): Promise<GeneralSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/general`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["general-settings"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch general settings: ${res.status}`);

  return res.json();
}
