import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  InvoiceResponse,
  InvoicesParams,
  InvoicesResponse,
} from "@/shared/lib/types/reports/invoice";

function getAuthHeaders(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function getInvoices({
  page = 1,
  limit = 20,
  search,
  status,
  fromDate,
  toDate,
  invoiceId,
  clientId,
}: InvoicesParams = {}): Promise<InvoicesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
    ...(status && status !== "all" && { status }),
    ...(fromDate && { fromDate }),
    ...(toDate && { toDate }),
    ...(invoiceId && { invoiceId }),
    ...(clientId && { clientId }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/invoices?${params}`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
      next: { revalidate: 30, tags: ["invoices"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch invoices: ${res.status}`);
  return res.json();
}

export async function getInvoiceById(id: string): Promise<InvoiceResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/invoices/${id}`,
    {
      method: "GET",
      headers: getAuthHeaders(token),
      next: { revalidate: 30, tags: ["invoices", `invoice-${id}`] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch invoice: ${res.status}`);
  return res.json();
}
