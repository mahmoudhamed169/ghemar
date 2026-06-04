"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

interface AssignDriverResult {
  success: boolean;
  message?: string;
}

export async function assignDriver(
  orderId: string,
  driverId: string,
): Promise<AssignDriverResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders/${orderId}/assign`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ driverId }),
    },
  );

  if (!res.ok) {
    return { success: false, message: "فشل تعيين السائق" };
  }

  revalidateTag("orders", {});
  revalidatePath("/[locale]/orders", "page");

  return { success: true };
}
