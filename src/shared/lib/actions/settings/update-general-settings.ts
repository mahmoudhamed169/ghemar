"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import { GeneralSettingsResponse } from "../../types/settings/general-settings";

export async function updateGeneralSettingsAction(
  formData: FormData,
): Promise<GeneralSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/general`,
    {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    },
  );

  if (!res.ok) throw new Error(`Failed to update general settings: ${res.status}`);

  revalidateTag("general-settings", "default");

  return res.json();
}
