"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export async function toggleBranchStatusAction(id: string): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/branches/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error(`Failed to toggle branch status: ${res.status}`);

  revalidateTag("branches", {});
  revalidatePath("/[locale]/settings/branches", "page");
}
