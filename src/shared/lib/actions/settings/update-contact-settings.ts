"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag, revalidatePath } from "next/cache";

export interface ContactSettingsInput {
  appName: string;
  supportEmail: string;
  supportPhone: string;
}

export async function updateContactSettingsAction(
  input: ContactSettingsInput,
): Promise<{ success: boolean; message?: string }> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/general`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(input),
    },
  );

  if (!res.ok) return { success: false, message: "فشل تحديث بيانات التواصل" };

  // revalidate the public contact fetch so sidebar/login logo updates
  revalidateTag("contact-info", {});
  // revalidate general settings in case other pages depend on it
  revalidateTag("general-settings", {});
  // revalidate the contact settings page so the form shows fresh data
  revalidatePath("/[locale]/settings/contact", "page");

  return { success: true };
}
