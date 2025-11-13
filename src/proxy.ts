import createMiddleware from "next-intl/middleware";
import { routing } from "./libs/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export default createMiddleware(routing);

const protectedRoutes = [
  "/en/profile",
  "/reservation-history",
  "/favorites-concepts",
  "/notifications",
];
const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const response = intlMiddleware(request);
  const { pathname } = request.nextUrl;

  const sessionId = request.cookies.get("sessionId")?.value;
  const requestHeaders = new Headers(request.headers);

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!sessionId && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (sessionId) {
    requestHeaders.set("authorization", `Bearer ${sessionId}`);
  }
  // if (refreshToken && pathname === "/login") {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return response;
}
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: [
    // "/profile/:path*",
    // "/notifications/:path*",
    // "/reservation-history/:path*",
    // "/favorites-concepts/:path*",
    "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
  ],
};
