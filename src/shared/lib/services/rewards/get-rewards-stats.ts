import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { RewardsStatsResponse } from "../../types/rewards/rewards";

export async function getRewardsStats(): Promise<RewardsStatsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/rewards/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["rewards-stats"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch rewards stats: ${res.status}`);

  return res.json();
}
