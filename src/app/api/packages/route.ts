import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { getPackages } from "@/shared/lib/services/packages/get-packages";

export async function GET() {
  try {
    const data = await getPackages();
    return NextResponse.json(data);
  } catch (error) {
    unstable_rethrow(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch packages" },
      { status: 500 },
    );
  }
}
