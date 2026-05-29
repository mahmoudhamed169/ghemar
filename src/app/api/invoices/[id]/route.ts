import { NextRequest, NextResponse } from "next/server";
import { getInvoiceById } from "@/shared/lib/services/reports/get-invoices";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const data = await getInvoiceById(id);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch invoice",
      },
      { status: 500 },
    );
  }
}
