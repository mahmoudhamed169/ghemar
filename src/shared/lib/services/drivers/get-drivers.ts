import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { DriversParams, DriversResponse } from "../../types/drivers/driver";

export async function getDrivers({
  page = 1,
  limit = 20,
  search,
  cityId,
  status,
  activityStatus,
}: DriversParams = {}): Promise<DriversResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(cityId && { cityId }),
    ...(status && { status }),
    ...(activityStatus && { activityStatus }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/drivers?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30 , tags: ["drivers"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch drivers: ${res.status}`);
  return res.json();
}
