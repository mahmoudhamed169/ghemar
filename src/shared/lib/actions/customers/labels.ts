"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  CustomerLabel,
  CustomerLabelInput,
  LabelActionResult,
  LabelMembersBody,
} from "../../types/customers/labels";

async function request<T>(
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: unknown,
): Promise<LabelActionResult<T>> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/customer-labels${path}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    },
  );

  const json = await res.json().catch(() => ({}));

  if (res.ok && method !== "GET") {
    revalidateTag("customers", {});
    revalidatePath("/[locale]/customers", "page");
  }

  return {
    success: res.ok,
    status: res.status,
    message: json?.message,
    data: json?.data,
  };
}

export async function getCustomerLabelsAction() {
  return request<CustomerLabel[]>("", "GET");
}

export async function createCustomerLabelAction(input: CustomerLabelInput) {
  return request<CustomerLabel>("", "POST", input);
}

export async function updateCustomerLabelAction(id: string, input: CustomerLabelInput) {
  return request<CustomerLabel>(`/${id}`, "PUT", input);
}

export async function deleteCustomerLabelAction(id: string) {
  return request(`/${id}`, "DELETE");
}

export async function addCustomerLabelMembersAction(id: string, body: LabelMembersBody) {
  return request<{ affected: number }>(`/${id}/members`, "POST", body);
}

export async function removeCustomerLabelMembersAction(id: string, body: LabelMembersBody) {
  return request<{ affected: number }>(`/${id}/members`, "DELETE", body);
}
