import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { CustomersParams, CustomersResponse } from "../../types/customers"

export async function getCustomers({
  page = 1,
  limit = 7,
  search = "",
}: CustomersParams = {}): Promise<CustomersResponse> {
  const session = await getServerSession(authOptions)
  const token = session?.accessToken

  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
  })

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 30, tags: ["customers"] },
    },
  )

  if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`)
  return res.json()
}