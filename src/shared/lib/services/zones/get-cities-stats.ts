import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CityStatsResponse } from "../../types/zones/city";

export async function getCitiesStats(): Promise<CityStatsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["cities-stats"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch cities stats: ${res.status}`);
  return res.json();
}
