import { CustomersParams, CustomersResponse } from "../../types/customers";


export async function getCustomers({
  page = 1,
  limit = 7,
  search = "",
}: CustomersParams = {}): Promise<CustomersResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...(search && { search }),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DEV_TOKEN}`,
      },
      next: { revalidate: 30 },
    },
  );

  if (!res.ok) throw new Error(`Failed to fetch customers: ${res.status}`);
  return res.json();
}
