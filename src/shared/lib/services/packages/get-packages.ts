import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { PackagesResponse } from "../../types/packages/package";

export async function getPackages(): Promise<PackagesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/packages`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["packages"] },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch packages: ${res.status}`);

  return res.json();
}
