"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { revalidatePath, revalidateTag } from "next/cache";
import { OrderStatus } from "../../types/orders/order";

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
  deliveredBagsCount?: number,
): Promise<{ success: boolean; message?: string; refundedBags?: number }> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const body: Record<string, unknown> = { status };
  if (status === "delivered_to_customer" && deliveredBagsCount !== undefined) {
    body.deliveredBagsCount = deliveredBagsCount;
  }

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) {
    return { success: false, message: "فشل تغيير حالة الطلب" };
  }

  const json = await res.json().catch(() => null);

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  // cancelling gives the client's bags back; the backend says how many
  return { success: true, refundedBags: json?.data?.refundedBags ?? 0 };
}
