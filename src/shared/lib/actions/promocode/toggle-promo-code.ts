"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

export interface TogglePromoCodeResponse {
  success: boolean;
  message: string;
  data: {
    isActive: boolean;
  };
}

export async function togglePromoCodeAction(
  id: string,
): Promise<TogglePromoCodeResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes/${id}/toggle`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error(`Failed to toggle promo code: ${res.status}`);

  revalidateTag("promo-codes");

  return res.json();
}
