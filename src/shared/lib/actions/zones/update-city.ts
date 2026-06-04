"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { UpdateCityInput, CityResponse } from "../../types/zones/city";

export async function updateCityAction(
  id: string,
  body: UpdateCityInput,
): Promise<CityResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to update city: ${res.status}`);

  revalidateTag("cities", {});
  revalidateTag("cities-stats", {});
  revalidatePath("/[locale]/settings/zones", "page");

  return res.json();
}
