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
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to create notification: ${res.status}`);

  revalidateTag("notifications");

  return res.json();
}
