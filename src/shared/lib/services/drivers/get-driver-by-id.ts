import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { DriverDetailResponse } from "../../types/drivers/driver";

export async function getDriverById(id: string): Promise<DriverDetailResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/drivers/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch driver: ${res.status}`);
  return res.json();
}
