"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import {
  UpdateAppUpdateBody,
  UpdateAppUpdateResult,
} from "../../types/settings/app-update";

export async function updateAppUpdateAction(
  body: UpdateAppUpdateBody,
): Promise<UpdateAppUpdateResult> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/app-update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const json = await res.json().catch(() => ({}));

  if (res.status === 409 && json?.needsConfirm) {
    return { success: false, needsConfirm: true, message: json?.message };
  }
  if (!res.ok) return { success: false, message: json?.message };

  return { success: true, data: json?.data };
}
