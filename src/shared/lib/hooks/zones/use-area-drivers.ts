import { useQuery } from "@tanstack/react-query";
import { AreaDriversResponse } from "../../types/zones/city";

async function fetchAreaDrivers(areaCode: string): Promise<AreaDriversResponse> {
  const res = await fetch(`/api/areas/${areaCode}/drivers`);
  if (!res.ok) throw new Error("Failed to fetch area drivers");
  return res.json();
}

export function useAreaDrivers(areaCode: string, enabled = false) {
  return useQuery({
    queryKey: ["area-drivers", areaCode],
    queryFn: () => fetchAreaDrivers(areaCode),
    enabled: enabled && !!areaCode,
  });
}
