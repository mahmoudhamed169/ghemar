import { NextRequest, NextResponse } from "next/server";
import { getDrivers } from "@/shared/lib/services/drivers/get-drivers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const data = await getDrivers({
      page: Number(searchParams.get("page")) || 1,
      limit: Number(searchParams.get("limit")) || 20,
      search: searchParams.get("search") || undefined,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch drivers",
      },
      { status: 500 }
    );
  }
}