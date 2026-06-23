import { NextRequest, NextResponse } from "next/server";
import { getCustomerById } from "@/shared/lib/services/customers/get-customer-by-id";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const data = await getCustomerById(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch customer" },
      { status: 500 },
    );
  }
}
