import { cache } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { OrdersParams, OrdersResponse } from "../../types/orders/order";

export const getOrders = cache(async function getOrders({
  page = 1,
  limit = 7,
  search = "",
  status,
  isExpressWash,
  dateFrom,
  dateTo,
  cityId,
  clientId,
  driverId,
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
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/orders?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 5, tags: ["orders"] },
    },
  );

  if (res.status === 429) throw new Error("429: الخادم يقيّد الطلبات، أعد المحاولة بعد لحظة");
  if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
  return res.json();
});
