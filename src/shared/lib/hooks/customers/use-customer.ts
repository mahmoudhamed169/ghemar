import { useQuery } from "@tanstack/react-query";
import { CustomerDetailResponse } from "../../types/customers";

async function fetchCustomer(id: string): Promise<CustomerDetailResponse> {
  const res = await fetch(`/api/customers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch customer");
  return res.json();
}

export function useCustomer(id: string | null) {
  return useQuery<CustomerDetailResponse>({
    queryKey: ["customer", id],
    queryFn: () => fetchCustomer(id!),
    enabled: !!id,
    staleTime: 0,
  });
}
