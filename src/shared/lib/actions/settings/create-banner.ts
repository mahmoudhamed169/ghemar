"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import { BannerResponse } from "../../types/settings/banner";

export async function createBannerAction(
  formData: FormData,
): Promise<BannerResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/banners`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  );

  if (!res.ok) throw new Error(`Failed to create banner: ${res.status}`);

  revalidateTag("banners", "default");

  return res.json();
}
