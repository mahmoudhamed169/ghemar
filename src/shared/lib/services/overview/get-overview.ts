import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OverviewResponse } from "../../types/overview/overview";
import { RateLimitError } from "../../utils/rate-limit-error";

export async function getOverview(): Promise<OverviewResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/overview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (res.status === 429) throw new RateLimitError("overview");

  if (!res.ok) {
    throw new Error(`Failed to fetch overview: ${res.status}`);
  }

  return res.json();
}
