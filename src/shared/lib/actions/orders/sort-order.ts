"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { SortedItem } from "../../types/orders/order";

export interface SortItem {
  itemType: string;
  count: number;
}

interface SortOrderResult {
  success: boolean;
  message?: string;
  /** HTTP status of a failed request — lets the caller word 403 / 404 itself */
  status?: number;
  sortedItems?: SortedItem[];
}

/**
 * First sort: POST — moves the order to at_laundry and asks the client to
 * pick a delivery time.
 * Edit (`edit: true`): PUT — replaces the whole list, keeps the status and
 * sends no notification. Only valid after the first sort.
 */
export async function sortOrder(
  orderId: string,
  items: SortItem[],
  edit = false,
): Promise<SortOrderResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/sort`,
    {
      method: edit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // itemType and count only — never the stored items' _id
      body: JSON.stringify({
        items: items.map(({ itemType, count }) => ({ itemType, count })),
      }),
    },
  );

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return {
      success: false,
      status: res.status,
      message: data?.message ?? "فشل حفظ بيانات الفرز",
    };
  }

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  return { success: true, sortedItems: data?.data?.sortedItems };
}
