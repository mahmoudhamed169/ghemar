import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { BranchesResponse } from "../../types/branches/branch";

interface GetBranchesParams {
  search?: string;
  cityId?: string;
  areaCode?: string;
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export async function getBranches(params?: GetBranchesParams): Promise<BranchesResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/branches`);
  if (params?.search)   url.searchParams.set("search", params.search);
  if (params?.cityId)   url.searchParams.set("cityId", params.cityId);
  if (params?.areaCode) url.searchParams.set("areaCode", params.areaCode);
  if (params?.isActive !== undefined) url.searchParams.set("isActive", String(params.isActive));
  if (params?.page)     url.searchParams.set("page", String(params.page));
  if (params?.limit)    url.searchParams.set("limit", String(params.limit));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    next: { revalidate: 30, tags: ["branches"] },
  });

  if (!res.ok) throw new Error(`Failed to fetch branches: ${res.status}`);
  return res.json();
}
