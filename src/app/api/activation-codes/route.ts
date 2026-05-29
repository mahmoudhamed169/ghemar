import { NextRequest, NextResponse } from "next/server";
import { getActivationCodes } from "@/shared/lib/services/bags/get-activation-codes";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 20;
    const packageId = searchParams.get("packageId") ?? undefined;
    const isUsedParam = searchParams.get("isUsed");
    const isUsed =
      isUsedParam === "true" ? true : isUsedParam === "false" ? false : undefined;

    const data = await getActivationCodes({ page, limit, packageId, isUsed });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch activation codes" },
      { status: 500 },
    );
  }
}
