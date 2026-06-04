"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateCityInput, CityResponse } from "../../types/zones/city";

export async function createCityAction(
  body: CreateCityInput,
): Promise<CityResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to create city: ${res.status}`);

  revalidateTag("cities", "default");
  revalidatePath("/[locale]/settings/zones", "page");

  return res.json();
}
