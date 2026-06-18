import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

interface ServerFetchOptions extends Omit<RequestInit, "headers"> {
  next?: NextFetchRequestConfig;
  params?: Record<string, string | number | boolean | undefined>;
}

export async function serverFetch<T>(
  path: string,
  options: ServerFetchOptions = {},
  fallback?: T,
): Promise<T> {
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  const { params, ...fetchOptions } = options;

  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
    });
  }

  const res = await fetch(url.toString(), {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(fetchOptions.headers as Record<string, string>),
    },
  });

  if (res.status === 429) {
    console.warn(`⚠️ [429] rate limited: ${path}`);
    if (fallback !== undefined) return fallback;
    throw new Error(`429: Too many requests — ${path}`);
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch ${path}: ${res.status}`);
  }

  return res.json();
}
