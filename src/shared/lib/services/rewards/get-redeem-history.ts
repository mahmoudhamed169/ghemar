import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { RedeemResponse } from "../../types/rewards/rewards";

export interface RedeemHistoryParams {
  page?: number;
  limit?: number;
}

export async function getRedeemHistory({
  page = 1,
  limit = 20,
}: RedeemHistoryParams = {}): Promise<RedeemResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/rewards/redemptions?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["redeem-history"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch redeem history: ${res.status}`);

  return res.json();
}
