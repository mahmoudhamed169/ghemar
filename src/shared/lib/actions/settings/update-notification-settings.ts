"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  NotificationSettings,
  NotificationSettingsResponse,
} from "../../types/settings/notification-settings";

export async function updateNotificationSettingsAction(
  body: NotificationSettings,
): Promise<NotificationSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/notifications`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok)
    throw new Error(`Failed to update notification settings: ${res.status}`);

  revalidateTag("notification-settings", "default");

  return res.json();
}
