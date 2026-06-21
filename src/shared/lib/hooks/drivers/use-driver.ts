"use client";

import { useQuery } from "@tanstack/react-query";
import { DriverDetailResponse } from "@/shared/lib/types/drivers/driver";

async function fetchDriver(id: string): Promise<DriverDetailResponse> {
  const res = await fetch(`/api/drivers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch driver");
  return res.json();
}

export function useDriver(id: string | null) {
  return useQuery<DriverDetailResponse>({
    queryKey: ["driver", id],
    queryFn: () => fetchDriver(id!),
    enabled: !!id,
    staleTime: 0,
  });
}
