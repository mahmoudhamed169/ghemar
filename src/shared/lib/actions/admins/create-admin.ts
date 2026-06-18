"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateAdminPayload } from "../../types/admins/admin";

interface AdminActionResponse {
  success: boolean;
  message: string;
}

export async function createAdmin(payload: CreateAdminPayload): Promise<AdminActionResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  console.log("📤 create-admin payload:", JSON.stringify(payload));

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();
  console.log("📦 create-admin:", res.status, JSON.stringify(data));

  if (!res.ok) {
    return { success: false, message: data.message ?? "Failed to create admin" };
  }

  revalidateTag("admins", {});
  revalidatePath("/[locale]/settings/admins", "page");
  return { success: true, message: data.message };
}
