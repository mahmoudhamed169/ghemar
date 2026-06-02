import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { TermsSettingsResponse } from "../../types/settings/terms-settings";

export async function getTermsSettings(): Promise<TermsSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/terms`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["terms-settings"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch terms settings: ${res.status}`);

  return res.json();
}
