import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  SentNotificationsParams,
  SentNotificationsResponse,
} from "../../types/notifications/sent-notification";

export async function getSentNotifications({
  page = 1,
  limit = 20,
  recipientRole,
  type,
  search,
  recipientId,
  orderId,
}: SentNotificationsParams = {}): Promise<SentNotificationsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(recipientRole && { recipientRole }),
    ...(type && { type }),
    ...(search && { search }),
    ...(recipientId && { recipientId }),
    ...(orderId && { orderId }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/notifications/sent?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch sent notifications: ${res.status}`);

  return res.json();
}
