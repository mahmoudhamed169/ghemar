"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  UpdatePromoCodeBody,
  UpdatePromoCodeResponse,
} from "@/shared/lib/types/promocode/update-promo-code";

export async function updatePromoCodeAction(
  id: string,
  body: UpdatePromoCodeBody,
): Promise<UpdatePromoCodeResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to update promo code: ${res.status}`);

  revalidateTag("promo-codes", {});
  revalidatePath("/[locale]/promo-codes", "page");

  return res.json();
}
