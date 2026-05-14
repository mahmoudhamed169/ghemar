import { OverviewResponse } from "../../types/stats";

export async function getOverview(): Promise<OverviewResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics/overview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEV_TOKEN}`,
      },
      next: {
        revalidate: 10, // ← كل 60 ثانية
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch overview: ${res.status}`);
  }

  return res.json();
}
