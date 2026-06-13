"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { OrderStatus } from "../../types/orders/order";

export async function updateOrderStatusAction(
  orderId: string,
  status: OrderStatus,
  deliveredBagsCount?: number,
): Promise<{ success: boolean; message?: string }> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const body: Record<string, unknown> = { status };
  if (status === "delivered_to_customer" && deliveredBagsCount !== undefined) {
    body.deliveredBagsCount = deliveredBagsCount;
  }

  const res = await fetch(
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

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  return { success: true };
}
