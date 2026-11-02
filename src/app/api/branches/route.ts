import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { getBranches } from "@/shared/lib/services/branches/get-branches";

export async function GET() {
  try {
    const data = await getBranches();
    return NextResponse.json(data);
  } catch (error) {
    unstable_rethrow(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch branches" },
      { status: 500 },
    );
  }
}
