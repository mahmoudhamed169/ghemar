"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

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
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/sort`;

    const body = {
      items,
    };

    // REQUEST
    console.log("========== SORT REQUEST ==========");
    console.log("URL:", url);
    console.log("TOKEN:", token);
    console.log("BODY:", JSON.stringify(body, null, 2));

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // RESPONSE
    console.log("========== SORT RESPONSE ==========");
    console.log("STATUS:", res.status);

    const data = await res.json();

    console.log("RESPONSE BODY:", JSON.stringify(data, null, 2));

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "فشل حفظ بيانات الفرز",
      };
    }

    revalidateTag("orders");

    return {
      success: true,
      message: data?.message,
    };
  } catch (error) {
    console.error("SORT ERROR:", error);

    return {
      success: false,
      message: "حدث خطأ أثناء الفرز",
    };
  }
}