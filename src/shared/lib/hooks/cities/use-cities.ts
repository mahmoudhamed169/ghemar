import { useQuery } from "@tanstack/react-query";
import { CitiesResponse } from "../../types/cities/city";

async function fetchCities(): Promise<CitiesResponse> {
  const res = await fetch("/api/cities");
  if (!res.ok) throw new Error("Failed to fetch cities");
  return res.json();
}

export function useCities() {
  return useQuery({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 1000 * 60 * 10, // 10 min — cities rarely change
  });
}
