import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { AreaDriversResponse } from "../../types/zones/city";

export async function getAreaDrivers(
  areaCode: string,
): Promise<AreaDriversResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/areas/${areaCode}/drivers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: [`area-drivers-${areaCode}`] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch area drivers: ${res.status}`);

  return res.json();
}
