"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import { RewardsSettings, RewardsSettingsResponse } from "../../types/rewards/rewards-settings";

export async function updateRewardsSettingsAction(
  body: RewardsSettings,
): Promise<RewardsSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/rewards`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok)
    throw new Error(`Failed to update rewards settings: ${res.status}`);

  revalidateTag("rewards-settings", {});

  return res.json();
}
