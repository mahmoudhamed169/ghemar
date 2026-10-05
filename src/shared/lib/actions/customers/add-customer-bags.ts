"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  AddCustomerBagsInput,
  AddCustomerBagsResult,
} from "../../types/customers";

export async function addCustomerBagsAction(
  customerId: string,
  input: AddCustomerBagsInput,
): Promise<AddCustomerBagsResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${customerId}/bags`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
  );

  const json = await res.json().catch(() => ({}));

  if (!res.ok) return { success: false, message: json?.message };

  revalidateTag("customers", {});
  revalidatePath("/[locale]/customers", "page");

  return { success: true, message: json?.message, data: json?.data };
}
