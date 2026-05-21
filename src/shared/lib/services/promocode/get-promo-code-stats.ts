import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PromoCodeStatsResponse } from "../../types/promocode/promo-code-stats";

export async function getPromoCodeStats(): Promise<PromoCodeStatsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["promo-codes"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch promo code stats: ${res.status}`);

  return res.json();
}
