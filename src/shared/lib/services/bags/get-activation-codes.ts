import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import {
  ActivationCodesParams,
  ActivationCodesResponse,
} from "../../types/bags/activation-code";

export async function getActivationCodes({
  page = 1,
  limit = 20,
  packageId,
  isUsed,
}: ActivationCodesParams = {}): Promise<ActivationCodesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(packageId && { packageId }),
    ...(isUsed !== undefined && { isUsed: String(isUsed) }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/activation/codes?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["activation-codes"] },
    },
  );

  if (!res.ok)
    throw new Error(`Failed to fetch activation codes: ${res.status}`);

  return res.json();
}
