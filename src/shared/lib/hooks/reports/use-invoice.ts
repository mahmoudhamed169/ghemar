"use client";

import { useQuery } from "@tanstack/react-query";
import { InvoiceResponse } from "@/shared/lib/types/reports/invoice";

async function fetchInvoice(id: string): Promise<InvoiceResponse> {
  const res = await fetch(`/api/invoices/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch invoice");
  }

  return res.json();
}

export function useInvoice(id?: string, enabled = true) {
  return useQuery<InvoiceResponse>({
    queryKey: ["invoice", id],
    queryFn: () => fetchInvoice(id!),
    enabled: Boolean(id) && enabled,
    staleTime: 30_000,
  });
}
