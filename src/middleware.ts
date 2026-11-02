import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

function isSuperAdmin(role?: string | null) {
  return role === "super_admin";
}

const LOCALES = ["ar", "en"];

const PUBLIC_PAGES = ["/login"];

const SUPER_ADMIN_ROUTES = [
  "/packages",
  "/promo-codes",
  "/bags",
  "/reports",
  "/bounes",
  "/settings",
];

const intlMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: "ar",
  localePrefix: "always",
});

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const firstSegment = pathname.split("/")[1];
  const locale = LOCALES.includes(firstSegment) ? firstSegment : "ar";

  const rawToken =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!rawToken;
  const isPublicPage = PUBLIC_PAGES.some((page) => pathname.includes(page));

  if (!isLoggedIn && !isPublicPage) {
    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
  }

  // the backend rejected the token (see api-fetch.ts); without clearing the
  // cookie the check below would send the user straight back to the dashboard
  if (isLoggedIn && isPublicPage && req.nextUrl.searchParams.has("expired")) {
    const res = NextResponse.redirect(new URL(`/${locale}/login`, req.url));
    req.cookies
      .getAll()
      .filter(({ name }) => name.includes("next-auth.session-token"))
      .forEach(({ name }) =>
        // browsers ignore a __Secure- cookie that isn't set with the secure flag
        res.cookies.set(name, "", {
          maxAge: 0,
          path: "/",
          secure: name.startsWith("__Secure-"),
        }),
      );
    return res;
  }

  if (isLoggedIn && isPublicPage) {
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
      return NextResponse.redirect(new URL(`/${locale}/unauthorized`, req.url));
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|sounds).*)"],
};
