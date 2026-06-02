import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OperationalSettingsResponse } from "../../types/settings/operational-settings";

export async function getOperationalSettings(): Promise<OperationalSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/operational`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["operational-settings"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch operational settings: ${res.status}`);

  return res.json();
}
