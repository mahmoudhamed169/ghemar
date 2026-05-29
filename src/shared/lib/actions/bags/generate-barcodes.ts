"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";

// ─── Package (activation codes) ───────────────────────────────────────────────

export interface GeneratePackageBarcodesBody {
  packageId: string;
  count: number;
}

export interface GeneratedActivationCode {
  _id: string;
  code: string;
}

export interface GeneratePackageBarcodesResponse {
  success: boolean;
  message: string;
  data: GeneratedActivationCode[];
}

export async function generatePackageBarcodesAction(
  body: GeneratePackageBarcodesBody,
): Promise<GeneratePackageBarcodesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/activation/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok)
    throw new Error(`Failed to generate activation codes: ${res.status}`);

  revalidateTag("activation-codes", {});
  return res.json();
}

// ─── Single bags ──────────────────────────────────────────────────────────────

export interface GenerateSingleBagsBody {
  count: number;
}

export interface GeneratedBag {
  _id: string;
  barcode: string;
  batchId: string;
}

export interface GenerateSingleBagsResponse {
  success: boolean;
  message: string;
  data: GeneratedBag[];
}

export async function generateSingleBagsAction(
  body: GenerateSingleBagsBody,
): Promise<GenerateSingleBagsResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bags/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok)
    throw new Error(`Failed to generate bags: ${res.status}`);

  revalidateTag("bags", {});
  return res.json();
}
