"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { isStoredNotificationId } from "../../utils/notification-id";

async function putRead(path: string): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(`Failed to mark notification read: ${res.status}`);
}

export async function markNotificationReadAction(id: string): Promise<void> {
  // only stored notifications (Mongo ObjectId) can be marked as read
  if (!isStoredNotificationId(id)) return;
  await putRead(`/api/notifications/${id}/read`);
}

export async function markAllNotificationsReadAction(): Promise<void> {
  await putRead("/api/notifications/read-all");
}
