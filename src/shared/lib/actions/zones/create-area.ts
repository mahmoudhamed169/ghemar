"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateAreaInput } from "../../types/zones/city";

export async function createAreaAction(
  cityId: string,
  body: CreateAreaInput,
): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${cityId}/areas`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to create area: ${res.status}`);

  revalidateTag("cities", {});
  revalidatePath("/[locale]/settings/zones", "page");
}
