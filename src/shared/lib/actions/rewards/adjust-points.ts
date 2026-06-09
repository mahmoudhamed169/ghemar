"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export interface AdjustPointsBody {
  userId: string;
  points: number;
  description: string;
}

export interface AdjustPointsResponse {
  success: boolean;
  message: string;
}

export async function adjustPointsAction(
  body: AdjustPointsBody,
): Promise<AdjustPointsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/rewards/points/adjust`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to adjust points: ${res.status}`);

  revalidateTag("rewards-points", {});
  revalidateTag("rewards-stats", {});
  revalidatePath("/[locale]/bounes", "page");

  return res.json();
}
