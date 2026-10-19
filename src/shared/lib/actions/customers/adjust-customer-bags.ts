"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  AdjustCustomerBagsInput,
  AdjustCustomerBagsResult,
  BagsAdjustmentType,
} from "../../types/customers";

/**
 * Adds bags to a customer's balance (POST /bags) or deducts them
 * (POST /bags/deduct). Neither notifies the customer. A deduction larger
 * than the balance is refused with 400 and nothing is taken.
 */
export async function adjustCustomerBagsAction(
  customerId: string,
  type: BagsAdjustmentType,
  input: AdjustCustomerBagsInput,
): Promise<AdjustCustomerBagsResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const path = type === "deduct" ? "bags/deduct" : "bags";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${customerId}/${path}`,
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
