// hooks/use-drivers.ts
"use client";

import { useEffect, useState } from "react";
import { Driver, DriversParams } from "@/shared/lib/types/drivers/driver";
import { getDrivers } from "@/shared/lib/services/drivers/get-drivers";

interface UseDriversReturn {
  drivers: Driver[];
  isLoading: boolean;
  error: string | null;
}

export function useDrivers(params: DriversParams = {}): UseDriversReturn {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await getDrivers(params);
        setDrivers(res.data);
      } catch {
        setError("فشل تحميل السائقين");
      } finally {
        setIsLoading(false);
      }
    }
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.search, params.status, params.activityStatus, params.page]);

  return { drivers, isLoading, error };
}
