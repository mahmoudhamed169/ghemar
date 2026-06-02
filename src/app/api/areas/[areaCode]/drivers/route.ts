import { NextResponse } from "next/server";
import { getAreaDrivers } from "@/shared/lib/services/zones/get-area-drivers";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ areaCode: string }> },
) {
  try {
    const { areaCode } = await params;
    const data = await getAreaDrivers(areaCode);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch area drivers" },
      { status: 500 },
    );
  }
}
