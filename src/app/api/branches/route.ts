import { NextResponse } from "next/server";
import { getBranches } from "@/shared/lib/services/branches/get-branches";

export async function GET() {
  try {
    const data = await getBranches();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to fetch branches" },
      { status: 500 },
    );
  }
}
