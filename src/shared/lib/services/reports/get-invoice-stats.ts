import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { InvoiceStatsResponse } from "@/shared/lib/types/reports/invoice";

export async function getInvoiceStats(): Promise<InvoiceStatsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/invoices/stats`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch invoice stats: ${res.status}`);
  return res.json();
}
