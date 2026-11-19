"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
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

  const res = await apiFetch(
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

  // a thrown message doesn't reach the client in production — return it instead
  if (!res.ok) {
    const json = await res.json().catch(() => null);
    return {
      success: false,
      status: res.status,
      message: typeof json?.message === "string" ? json.message : "",
    };
  }

  revalidateTag("promo-codes", {});
  revalidatePath("/[locale]/promo-codes", "page");

  return res.json();
}
