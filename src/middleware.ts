import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PAGES = ["/login"];

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // ✅ قراءة الـ session token مباشرة من الـ cookie بدون next-auth
  const token =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!token;
  const isPublicPage = PUBLIC_PAGES.some((page) => pathname.includes(page));

  if (!isLoggedIn && !isPublicPage) {
    const locale = pathname.split("/")[1] ?? "ar";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isLoggedIn && isPublicPage) {
    const locale = pathname.split("/")[1] ?? "ar";
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};