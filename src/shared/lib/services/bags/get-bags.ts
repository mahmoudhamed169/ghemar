import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { BagsResponse, BagsParams } from "../../types/bags/bag";

export async function getBags({
  page = 1,
  limit = 50,
  search,
  status,
  barcode,
  dateFrom,
  dateTo,
  batchId,
  packageId,
}: BagsParams = {}): Promise<BagsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search    && { search }),
    ...(status && status !== "all" && { status }),
    ...(barcode   && { barcode }),
    ...(dateFrom  && { dateFrom }),
    ...(dateTo    && { dateTo }),
    ...(batchId   && { batchId }),
    ...(packageId && { packageId }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bags?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 2, tags: ["bags"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch bags: ${res.status}`);

  return res.json();
}