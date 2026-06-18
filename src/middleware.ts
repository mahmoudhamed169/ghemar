import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(role?: string | null) {
  return role === "super_admin";
}

const PUBLIC_PAGES = ["/login"];

const SUPER_ADMIN_ROUTES = [
  "/packages",
  "/promo-codes",
  "/bags",
  "/reports",
  "/bounes",
  "/alerts",
  "/settings",
];

const intlMiddleware = createMiddleware({
  locales: ["ar", "en"],
  defaultLocale: "ar",
  localePrefix: "always",
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const rawToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!rawToken;
  const isPublicPage = PUBLIC_PAGES.some((page) => pathname.includes(page));

  if (!isLoggedIn && !isPublicPage) {
    const locale = pathname.split("/")[1] ?? "ar";
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  if (isLoggedIn && isPublicPage) {
    const locale = pathname.split("/")[1] ?? "ar";
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // check role for super_admin-only routes
  const pathWithoutLocale = "/" + pathname.split("/").slice(2).join("/");
  const isSuperAdminRoute = SUPER_ADMIN_ROUTES.some(
    (route) => pathWithoutLocale === route || pathWithoutLocale.startsWith(route + "/"),
  );

  if (isLoggedIn && isSuperAdminRoute) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!isSuperAdmin(token?.role as string)) {
      const locale = pathname.split("/")[1] ?? "ar";
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
