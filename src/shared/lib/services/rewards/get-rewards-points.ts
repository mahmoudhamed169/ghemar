import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { RewardsPointsResponse } from "../../types/rewards/rewards";

export interface RewardsPointsParams {
  page?: number;
  limit?: number;
}

export async function getRewardsPoints({
  page = 1,
  limit = 20,
}: RewardsPointsParams = {}): Promise<RewardsPointsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/rewards/points?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["rewards-points"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch rewards points: ${res.status}`);

  return res.json();
}
