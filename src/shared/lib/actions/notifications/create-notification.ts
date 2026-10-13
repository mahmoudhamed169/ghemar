"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  CreateNotificationBody,
  CreateNotificationResponse,
} from "../../types/notifications/notification";

export async function createNotificationAction(
  body: CreateNotificationBody,
): Promise<CreateNotificationResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/send`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  const json = await res.json().catch(() => ({}));

  if (!res.ok) return { success: false, message: json?.message ?? "", status: res.status };

  revalidateTag("notifications", {});

  return json;
}
