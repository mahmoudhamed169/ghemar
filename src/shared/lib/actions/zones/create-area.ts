"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { CreateAreaInput } from "../../types/zones/city";

function toGeoJSON(points: CreateAreaInput["polygon"]) {
  const first = points[0];
  const ring: [number, number][] = points.map((p) => [p.lng, p.lat]);
  ring.push([first.lng, first.lat]); // close the ring explicitly (new array, no shared ref)
  return { type: "Polygon", coordinates: [ring] };
}

export async function createAreaAction(
  cityId: string,
  body: CreateAreaInput,
): Promise<void> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const apiBody = { ...body, polygon: toGeoJSON(body.polygon) };
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/admin/cities/${cityId}/areas`;

  console.log("═══ [createArea] REQUEST ═══");
  console.log("URL :", url);
  console.log("BODY:", JSON.stringify(apiBody, null, 2));
  console.log("════════════════════════════");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(apiBody),
  });

  const resBody = await res.json().catch(() => ({}));

  console.log("═══ [createArea] RESPONSE ═══");
  console.log("STATUS:", res.status, res.statusText);
  console.log("BODY  :", JSON.stringify(resBody, null, 2));
  console.log("═════════════════════════════");

  if (!res.ok) {
    const detail = resBody?.errors
      ? JSON.stringify(resBody.errors)
      : resBody?.message ?? `${res.status}`;
    throw new Error(detail);
  }

  revalidateTag("cities", {});
  revalidateTag("cities-stats", {});
  revalidatePath("/[locale]/settings/zones", "page");
}
