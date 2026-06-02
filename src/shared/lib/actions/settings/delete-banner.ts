"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

export async function deleteBannerAction(id: string): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/banners/${id}`,
    {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  if (!res.ok) throw new Error(`Failed to delete banner: ${res.status}`);

  revalidateTag("banners", "default");
}
