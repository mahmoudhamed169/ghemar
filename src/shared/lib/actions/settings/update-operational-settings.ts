"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  OperationalSettings,
  OperationalSettingsResponse,
} from "../../types/settings/operational-settings";

export async function updateOperationalSettingsAction(
  body: OperationalSettings,
): Promise<OperationalSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/operational`,
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
    throw new Error(`Failed to update operational settings: ${res.status}`);

  revalidateTag("operational-settings", "default");

  return res.json();
}
