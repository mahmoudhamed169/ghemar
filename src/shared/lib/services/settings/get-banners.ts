import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { BannersResponse } from "../../types/settings/banner";

export async function getBanners(): Promise<BannersResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/banners`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["banners"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch banners: ${res.status}`);

  return res.json();
}
