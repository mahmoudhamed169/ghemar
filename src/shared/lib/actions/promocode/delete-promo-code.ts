"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { revalidatePath, revalidateTag } from "next/cache";
import { DeletePromoCodeResponse } from "@/shared/lib/types/promocode/update-promo-code";

/** deletes the code for good; past orders keep their own copy of it */
export async function deletePromoCodeAction(id: string): Promise<DeletePromoCodeResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const json = await res.json().catch(() => null);
  if (!res.ok) {
    return { success: false, message: typeof json?.message === "string" ? json.message : "" };
  }

  revalidateTag("promo-codes", {});
  revalidatePath("/[locale]/promo-codes", "page");

  return { success: true, message: json?.message ?? "" };
}
