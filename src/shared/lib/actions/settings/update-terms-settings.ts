"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  TermsSettings,
  TermsSettingsResponse,
} from "../../types/settings/terms-settings";

export async function updateTermsSettingsAction(
  body: TermsSettings,
): Promise<TermsSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/terms`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to update terms settings: ${res.status}`);

  revalidateTag("terms-settings", "default");

  return res.json();
}
