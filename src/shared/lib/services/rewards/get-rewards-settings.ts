import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { RewardsSettingsResponse } from "../../types/rewards/rewards-settings";

export async function getRewardsSettings(): Promise<RewardsSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/rewards`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["rewards-settings"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch rewards settings: ${res.status}`);

  return res.json();
}
