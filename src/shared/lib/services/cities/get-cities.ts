import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CitiesResponse } from "../../types/cities/city";

export async function getCities(): Promise<CitiesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`Failed to fetch cities: ${res.status}`);
  return res.json();
}
