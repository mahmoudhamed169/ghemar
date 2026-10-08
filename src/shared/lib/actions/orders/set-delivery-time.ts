"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { ChosenDeliverySlot, DeliveryState } from "@/shared/lib/types/orders/order";

export type SetDeliveryTimeError =
  | "client_already_chose"
  | "wrong_status"
  | "must_be_future"
  | "invalid_date"
  | "other_branch"
  | "not_found"
  | "unknown";

export interface SetDeliveryTimeResult {
  success: boolean;
  error?: SetDeliveryTimeError;
  data?: {
    chosenDeliverySlot: ChosenDeliverySlot;
    deliveryTimeChosen: boolean;
    deliveryState: DeliveryState;
    canSetDeliveryTime: boolean;
  };
}

// the API answers in English; the dialog shows its own translated wording
function toErrorCode(status: number, message = ""): SetDeliveryTimeError {
  if (status === 403) return "other_branch";
  if (status === 404) return "not_found";
  if (status === 400) {
    if (message.includes("already chosen")) return "client_already_chose";
    if (message.includes("can only be set after")) return "wrong_status";
    if (message.includes("must be in the future")) return "must_be_future";
    if (message.includes("slotStart") || message.includes("slotEnd")) return "invalid_date";
  }
  return "unknown";
}

/** slotStart / slotEnd are ISO strings in UTC; slotEnd defaults to start + 2 hours on the server */
export async function setDeliveryTimeAction(
  orderId: string,
  slotStart: string,
  slotEnd?: string,
): Promise<SetDeliveryTimeResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/delivery-time`,
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
    return { success: false, error: toErrorCode(res.status, json?.message) };
  }

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  return { success: true, data: json?.data };
}
