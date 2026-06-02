import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { SecuritySettingsResponse } from "../../types/settings/security-settings";

export async function getSecuritySettings(): Promise<SecuritySettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/security`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["security-settings"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch security settings: ${res.status}`);

  return res.json();
}
