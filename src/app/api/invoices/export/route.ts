import { NextRequest, NextResponse } from "next/server";
import { getInvoices } from "@/shared/lib/services/reports/get-invoices";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") ?? undefined;
    const status = searchParams.get("status") ?? undefined;
    const fromDate = searchParams.get("from") ?? undefined;
    const toDate = searchParams.get("to") ?? undefined;

    const data = await getInvoices({ page: 1, limit: 9999, search, status, fromDate, toDate });
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Failed to fetch invoices" }, { status: 500 });
  }
}
