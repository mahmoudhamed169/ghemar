import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OrdersParams, OrdersResponse } from "../../types/orders/order";

export async function getOrders({
  page = 1,
  limit = 20,
  search = "",
  status,
  isExpressWash,
  dateFrom,
  dateTo,
  cityId,
  clientId,
  driverId,
  isNewClient,
}: OrdersParams = {}): Promise<OrdersResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status && { status }),
    ...(isExpressWash !== undefined && {
      isExpressWash: String(isExpressWash),
    }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
    ...(cityId && { cityId }),
    ...(clientId && { clientId }),
    ...(driverId && { driverId }),
    ...(isNewClient !== undefined && { isNewClient: String(isNewClient) }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["orders"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  return res.json();
}
