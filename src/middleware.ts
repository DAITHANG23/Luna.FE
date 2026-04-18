import createMiddleware from "next-intl/middleware";
import { routing } from "./libs/next-intl/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = [
  "/en/profile",
  "/vi/thong-tin-ca-nhan",
  "/en/reservation-history",
  "/vi/lich-su-dat-ban",
  "/en/favorites",
  "/vi/yeu-thich",
  "/en/notifications",
  "/vi/thong-bao",
];

const authRoutes = [
  "/en/login",
  "/vi/dang-nhap",
  "/en/register",
  "/vi/dang-ki",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("sessionId")?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (!sessionId && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionId && isAuthRoute) {
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  const response = intlMiddleware(request);

  if (sessionId) {
    response.headers.set("x-middleware-request-authorization", `Bearer ${sessionId}`);
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
