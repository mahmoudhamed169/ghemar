"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import { OperationalSettings } from "../../types/settings/operational-settings";

export interface ToggleAutoAssignResult {
  success: boolean;
  data?: OperationalSettings;
}

/**
 * Turns automatic driver assignment on or off. The wanted value is always sent:
 * with an empty body the API flips whatever is stored, which goes wrong on a
 * double click.
 */
export async function toggleAutoAssignAction(
  enabled: boolean,
): Promise<ToggleAutoAssignResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/operational/auto-assign/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ enabled: enabled === true }),
    },
  );

  const json = await res.json().catch(() => null);
  if (!res.ok || typeof json?.data?.autoAssignDrivers !== "boolean") {
    return { success: false };
  }

  revalidateTag("operational-settings", "default");

  return { success: true, data: json.data };
}
