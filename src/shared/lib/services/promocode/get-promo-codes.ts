import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PromoCodesResponse } from "../../types/promocode/promo-codes";

export async function getPromoCodes(): Promise<PromoCodesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/promo-codes`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["promo-codes"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch promo codes: ${res.status}`);

  return res.json();
}
