import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    const params = new URLSearchParams({
      page: req.nextUrl.searchParams.get("page") ?? "1",
      limit: req.nextUrl.searchParams.get("limit") ?? "20",
    });

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${id}/bags/history?${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    // pass the backend's status and { success, message } through as they are
    const json = await res.json().catch(() => ({ success: false }));
    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch bags history" },
      { status: 500 },
    );
  }
}
