"use client";

import { useQuery } from "@tanstack/react-query";
import {
  DriversParams,
  DriversResponse,
} from "@/shared/lib/types/drivers/driver";

async function fetchDrivers(
  params: DriversParams = {},
): Promise<DriversResponse> {
  const query = new URLSearchParams({
    page: String(params.page || 1),
    limit: String(params.limit || 20),
    ...(params.search && { search: params.search }),
    ...(params.cityId && { cityId: params.cityId }),
    ...(params.status && { status: params.status }),
    ...(params.activityStatus && {
      activityStatus: params.activityStatus,
    }),
  });

  const res = await fetch(`/api/drivers?${query}`);

  if (!res.ok) {
    throw new Error("Failed to fetch drivers");
  }

  return res.json();
}

export function useDrivers(
  params: DriversParams = {},
  options?: { enabled?: boolean },
) {
  return useQuery<DriversResponse>({
    queryKey: ["drivers", params],
    queryFn: () => fetchDrivers(params),
    staleTime: 30_000,
    enabled: options?.enabled ?? true,
  });
}
