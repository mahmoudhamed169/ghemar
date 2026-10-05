"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  ClosedWindowInput,
  UpdateOrderHoursResult,
} from "../../types/settings/order-hours";

// The list replaces the stored one entirely, so always send every window.
export async function updateOrderHoursAction(
  closedWindows: ClosedWindowInput[],
): Promise<UpdateOrderHoursResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/order-hours`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ closedWindows }),
    },
  );

  const json = await res.json().catch(() => ({}));

  if (!res.ok) return { success: false, message: json?.message };

  return { success: true, data: json?.data };
}
