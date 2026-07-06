"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { UpdateAreaInput } from "../../types/zones/city";

function toGeoJSON(points: NonNullable<UpdateAreaInput["polygon"]>) {
  const first = points[0];
  const ring: [number, number][] = points.map((p) => [p.lng, p.lat]);
  ring.push([first.lng, first.lat]);
  return { type: "Polygon", coordinates: [ring] };
}

export async function updateAreaAction(
  cityId: string,
  areaCode: string,
  body: UpdateAreaInput,
): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const apiBody = body.polygon?.length
    ? { ...body, polygon: toGeoJSON(body.polygon) }
    : body;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${cityId}/areas/${areaCode}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(apiBody),
    },
  );

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}));
    const detail = errBody?.errors
      ? JSON.stringify(errBody.errors)
      : errBody?.message ?? `${res.status}`;
    throw new Error(detail);
  }

  revalidateTag("cities", {});
  revalidateTag("cities-stats", {});
  revalidatePath("/[locale]/settings/zones", "page");

}
