"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { revalidatePath, revalidateTag } from "next/cache";
import { Order } from "@/shared/lib/types/orders/order";

export interface SetPickupTimeResult {
  success: boolean;
  /** the API's message on 400 / 403 */
  message?: string;
  data?: {
    pickup: Order["pickup"];
    estimatedPickupTime?: string;
    canSetPickupTime: boolean;
  };
}

/**
 * Changes the pickup window. slotStart / slotEnd are ISO strings in UTC;
 * slotEnd defaults to start + 2 hours on the server. Closed hours and the
 * 7-day limit don't apply to admins.
 */
export async function setPickupTimeAction(
  orderId: string,
  slotStart: string,
  slotEnd?: string,
): Promise<SetPickupTimeResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/pickup-time`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ slotStart, ...(slotEnd && { slotEnd }) }),
    },
  );

  const json = await res.json().catch(() => null);

  if (!res.ok) {
    return { success: false, message: typeof json?.message === "string" ? json.message : undefined };
  }

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  return { success: true, data: json?.data ?? json };
}
