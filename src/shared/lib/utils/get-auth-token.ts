import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"

export async function getAuthToken(): Promise<string | null> {
  const session = await getServerSession(authOptions)
  console.log("🔑 accessToken:", session?.accessToken)
  return session?.accessToken ?? null
}