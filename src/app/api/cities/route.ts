import { unstable_rethrow } from "next/navigation";
import { NextResponse } from "next/server";
import { getCities } from "@/shared/lib/services/cities/get-cities";

export async function GET() {
  try {
    const data = await getCities();
    return NextResponse.json(data);
  } catch (error) {
    unstable_rethrow(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch cities" },
      { status: 500 },
    );
  }
}
