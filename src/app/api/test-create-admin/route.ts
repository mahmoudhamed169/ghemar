import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  // get first available branch
  const branchesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/branches`,
    { headers: { Authorization: `Bearer ${token}` } },
  );
  const branchesData = await branchesRes.json();
  const firstBranchId = branchesData?.data?.[0]?._id ?? "NO_BRANCH_FOUND";

  const payload = {
    name: "تيست أدمن",
    phone: "+966500000001",
    role: "admin",
    branchId: firstBranchId,
    permissions: [],
  };

  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("📤 URL:", `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins`);
  console.log("📤 payload:", JSON.stringify(payload, null, 2));
  console.log("📤 token exists:", !!token);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/admin/admins`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    },
  );

  const data = await res.json();

  console.log("📦 status:", res.status);
  console.log("📦 response:", JSON.stringify(data, null, 2));
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

  return NextResponse.json({ status: res.status, payload, response: data });
}
