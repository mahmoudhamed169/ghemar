import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { NotificationSettingsResponse } from "../../types/settings/notification-settings";

export async function getNotificationSettings(): Promise<NotificationSettingsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/settings/notifications`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 60, tags: ["notification-settings"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch notification settings: ${res.status}`);

  return res.json();
}
