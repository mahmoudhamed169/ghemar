import { NextRequest, NextResponse } from "next/server";
import { getDriverById } from "@/shared/lib/services/drivers/get-driver-by-id";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const data = await getDriverById(id);
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch driver" },
      { status: 500 },
    );
  }
}
