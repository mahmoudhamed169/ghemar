import { clientFetch } from "@/shared/lib/utils/client-fetch";
import { useQuery } from "@tanstack/react-query";
import { PackagesResponse } from "../../types/packages/package";

async function fetchPackages(): Promise<PackagesResponse> {
  const res = await clientFetch("/api/packages");
  if (!res.ok) throw new Error("Failed to fetch packages");
  return res.json();
}

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: fetchPackages,
    staleTime: 1000 * 60 * 5,
  });
}
