"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

export interface UpdateCustomerInput {
  purchasedBarcodesCount?: number;
  receivedBagsCount?: number;
}

export async function updateCustomerAction(
  customerId: string,
  input: UpdateCustomerInput,
): Promise<{ success: boolean; message?: string }> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${customerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.ok) return { success: false, message: "فشل تحديث بيانات العميل" };

  revalidateTag("customers", {});

  return { success: true };
}
