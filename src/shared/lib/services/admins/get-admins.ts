import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { AdminsResponse } from "../../types/admins/admin";

export async function getAdmins(): Promise<AdminsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["admins"] },
    },
  );

  if (res.status === 429) {
    console.warn("⚠️ get-admins: rate limited (429), returning empty list");
    return { success: true, message: "", data: [] };
  }

  if (!res.ok) throw new Error(`Failed to fetch admins: ${res.status}`);
  return res.json();
}
