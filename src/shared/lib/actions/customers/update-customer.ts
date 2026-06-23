"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export interface UpdateCustomerInput {
  name?: string;
  email?: string;
  purchasedBarcodesCount?: number;
  receivedBagsCount?: number;
  preferredLanguage?: "ar" | "en";
  cityId?: string;
  isActive?: boolean;
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
  revalidatePath("/[locale]/customers", "page");

  return { success: true };
}
