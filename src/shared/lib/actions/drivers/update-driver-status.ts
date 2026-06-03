"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import { DriverStatus } from "@/shared/lib/types/drivers/driver";

interface UpdateDriverStatusPayload {
  driverId: string;
  status: DriverStatus;
}

interface UpdateDriverStatusResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function updateDriverStatus(
  payload: UpdateDriverStatusPayload,
): Promise<UpdateDriverStatusResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/drivers/${payload.driverId}/status`;
  console.log("URL:", url);

  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: payload.status }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message ?? "Failed to update driver status",
    };
  }

  revalidateTag("drivers", {});
  return { success: true, message: data.message, data: data.data };
}