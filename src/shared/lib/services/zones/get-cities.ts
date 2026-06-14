import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CitiesResponse } from "../../types/zones/city";

interface GetCitiesParams {
  search?: string;
  isActive?: boolean;
}

export async function getCities(params?: GetCitiesParams): Promise<CitiesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities`);
  if (params?.search) url.searchParams.set("search", params.search);
  if (params?.isActive !== undefined) url.searchParams.set("isActive", String(params.isActive));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 30, tags: ["cities"] },
  });

  if (!res.ok) throw new Error(`Failed to fetch cities: ${res.status}`);
  return res.json();
}
