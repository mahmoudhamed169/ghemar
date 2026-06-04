"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export async function toggleCityStatusAction(id: string): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${id}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error(`Failed to toggle city status: ${res.status}`);

  revalidateTag("cities", {});
  revalidatePath("/[locale]/settings/zones", "page");
}
