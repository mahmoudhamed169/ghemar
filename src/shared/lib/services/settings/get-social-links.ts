import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  snapchat: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
  whatsapp: string;
}

export async function getSocialLinks(): Promise<SocialLinks | null> {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/social-links`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60, tags: ["social-links"] },
      },
    );

    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch {
    return null;
  }
}
