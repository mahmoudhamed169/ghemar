import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PackageStatsResponse } from "../../types/packages/package-stats";

export async function getPackageStats(): Promise<PackageStatsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/packages/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["packages"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch package stats: ${res.status}`);

  return res.json();
}
