"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { UpdateAdminPayload } from "../../types/admins/admin";

interface AdminActionResponse {
  success: boolean;
  message: string;
}

export async function updateAdmin(id: string, payload: UpdateAdminPayload): Promise<AdminActionResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return { success: false, message: data.message ?? "Failed to update admin" };
  }

  revalidateTag("admins", {});
  revalidatePath("/[locale]/settings/admins", "page");
  return { success: true, message: data.message };
}
