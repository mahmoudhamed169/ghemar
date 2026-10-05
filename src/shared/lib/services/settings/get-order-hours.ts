import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OrderHoursResponse } from "../../types/settings/order-hours";

export async function getOrderHours(): Promise<OrderHoursResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/order-hours`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // isClosedNow / reopensAt depend on the current time, so never cache
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch order hours: ${res.status}`);

  return res.json();
}
