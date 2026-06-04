"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { UpdateAreaInput } from "../../types/zones/city";

export async function updateAreaAction(
  cityId: string,
  areaCode: string,
  body: UpdateAreaInput,
): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${cityId}/areas/${areaCode}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to update area: ${res.status}`);

  revalidateTag("cities", {});
  revalidateTag("cities-stats", {});
  revalidatePath("/[locale]/settings/zones", "page");

}
