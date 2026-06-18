"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

interface AdminActionResponse {
  success: boolean;
  message: string;
}

export async function toggleAdminStatus(id: string): Promise<AdminActionResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message ?? "Failed to toggle admin status" };
  }

  revalidateTag("admins", {});
  revalidatePath("/[locale]/settings/admins", "page");
  return { success: true, message: data.message };
}
