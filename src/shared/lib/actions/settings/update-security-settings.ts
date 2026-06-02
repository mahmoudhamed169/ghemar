"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  SecuritySettings,
  SecuritySettingsResponse,
} from "../../types/settings/security-settings";

export async function updateSecuritySettingsAction(
  body: SecuritySettings,
): Promise<SecuritySettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/security`,
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
    throw new Error(`Failed to update security settings: ${res.status}`);

  revalidateTag("security-settings", "default");

  return res.json();
}
