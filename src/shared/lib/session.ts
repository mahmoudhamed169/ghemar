import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  return session?.accessToken ?? null;
}
