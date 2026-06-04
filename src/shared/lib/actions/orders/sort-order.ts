"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export interface SortItem {
  itemType: string;
  count: number;
}

interface SortOrderResult {
  success: boolean;
  message?: string;
}

export async function sortOrder(
  orderId: string,
  items: SortItem[],
): Promise<SortOrderResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/sort`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ items }),
    },
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    return { success: false, message: data?.message ?? "فشل حفظ بيانات الفرز" };
  }

  revalidateTag("orders", {});
    revalidatePath("/[locale]/orders", "page");
  

  return { success: true };
}
