"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { SocialLinks } from "../../services/settings/get-social-links";

export async function updateSocialLinksAction(
  input: SocialLinks,
): Promise<{ success: boolean; message?: string }> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/social-links`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.ok) return { success: false, message: "فشل تحديث روابط التواصل الاجتماعي" };

  revalidateTag("social-links", {});
  revalidatePath("/[locale]/settings/contact", "page");
  return { success: true };
}
