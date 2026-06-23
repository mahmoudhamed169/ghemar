import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { CustomerDetailResponse } from "../../types/customers";

export async function getCustomerById(id: string): Promise<CustomerDetailResponse> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch customer: ${res.status}`);
  return res.json();
}
