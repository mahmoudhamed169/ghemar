import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { apiFetch } from "@/shared/lib/utils/api-fetch";
import { NotificationsResponse } from "../../types/notifications/notification";

export interface NotificationsParams {
  page?: number;
  limit?: number;
}

export async function getNotifications({
  page = 1,
  limit = 20,
}: NotificationsParams = {}): Promise<NotificationsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch notifications: ${res.status}`);

  return res.json();
}
