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

  console.log("[create-notification] body →", JSON.stringify(body, null, 2));

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

  const json = await res.json();
  console.log("[create-notification] response ←", JSON.stringify(json, null, 2));

  if (!res.ok) throw new Error(`Failed to create notification: ${res.status}`);

  revalidateTag("notifications", "default");

  return json;
}
