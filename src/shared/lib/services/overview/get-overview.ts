import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OverviewResponse } from "../../types/stats";

export async function getOverview(): Promise<OverviewResponse> {
  const session = await getServerSession(authOptions);
  console.log("SESSION:", JSON.stringify(session));
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/overview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 10,
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch overview: ${res.status}`);
  }

  return res.json();
}
