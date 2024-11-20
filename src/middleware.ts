import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const PUBLIC_PATHS = ["/login", "/signup"];
  const PROFILE_PUBLIC_PATHS = ["/welcome"];

  const token = request.cookies.get("ungradeToken")?.value || "";
  const user = request.cookies.get("ungradeUser")?.value || "";
  const userProfile = user ? JSON.parse(user).userProfile : null;

  if (!token && !PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && PUBLIC_PATHS.includes(pathname)) {
    if (token && userProfile === null) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    } else if (token && userProfile !== null) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  if (token && !PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (PROFILE_PUBLIC_PATHS.includes(pathname)) {
    if (token && userProfile === null) {
      return NextResponse.redirect(new URL("/welcome", request.url));
    } else if (token && userProfile !== null) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && !userProfile) {
    return NextResponse.redirect(new URL("/welcome", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup","/"],
};