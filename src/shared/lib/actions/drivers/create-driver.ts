"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

interface CreateDriverPayload {
  name: string;
  phone: string;
  cityId: string;
  vehicleType: string;
  vehiclePlate: string;
  nationalId: string;
  assignedAreas: string[];
}

interface CreateDriverResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

export async function createDriver(
  payload: CreateDriverPayload,
): Promise<CreateDriverResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/drivers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message ?? "Failed to create driver",
    };
  }

  revalidateTag("drivers", {});
  return { success: true, message: data.message, data: data.data };
}
