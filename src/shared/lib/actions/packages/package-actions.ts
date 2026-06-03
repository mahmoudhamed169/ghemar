"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidateTag } from "next/cache";
import {
  CreatePackageBody,
  DeletePackageResponse,
  PackageMutationResponse,
  UpdatePackageBody,
} from "../../types/packages/package-mutation";
async function getToken(): Promise<string | undefined> {
  const session = await getServerSession(authOptions);
  return session?.accessToken;
}

export async function createPackageAction(
  body: CreatePackageBody,
): Promise<PackageMutationResponse> {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/packages`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to create package: ${res.status}`);

  revalidateTag("packages", {});
  return res.json();
}

export async function updatePackageAction(
  id: string,
  body: UpdatePackageBody,
): Promise<PackageMutationResponse> {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/packages/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) throw new Error(`Failed to update package: ${res.status}`);

  revalidateTag("packages", {});
  return res.json();
}

export async function deletePackageAction(
  id: string,
): Promise<DeletePackageResponse> {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/packages/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) throw new Error(`Failed to delete package: ${res.status}`);

  revalidateTag("packages", {});
  return res.json();
}
