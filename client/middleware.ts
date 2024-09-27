import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { AUTH_COOKIE, REFRESH_COOKIE, getAuthCookie } from './app/auth/auth-cookie';

const protectedRoutes = ["/auth/login"];

export async function middleware(request: NextRequest) {
  const authenticated = !!cookies().get(AUTH_COOKIE)?.value;
  const hasProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (authenticated) {
    if (request.nextUrl.pathname === "/logout") {
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete(AUTH_COOKIE);
      response.cookies.delete(REFRESH_COOKIE);
      return response;
    } else if (hasProtectedRoute) {
      return Response.redirect(new URL("/", request.url));
    }
  } else {
    if (cookies().get(REFRESH_COOKIE)) {
      const refreshRes = await fetch(`${process.env.API_URL}/auth/refresh`, {
        headers: {
          Cookie: cookies().toString(),
        },
        method: "POST",
      });
      const authCookies = getAuthCookie(refreshRes);

      if (authCookies?.accessToken) {
        const response = NextResponse.redirect(request.url);
        response.cookies.set(authCookies.accessToken);
        return response;
      }
    } else if (!hasProtectedRoute) {
      return Response.redirect(new URL("/auth/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
