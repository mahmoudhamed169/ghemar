"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  CreatePromoCodeBody,
  CreatePromoCodeResponse,
} from "../../types/promocode/create-promo-code";

export async function createPromoCodeAction(
  body: CreatePromoCodeBody,
): Promise<CreatePromoCodeResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to create promo code: ${res.status}`);

  revalidateTag("promo-codes", {});
  revalidatePath("/[locale]/promo-codes", "page");

  return res.json();
}
