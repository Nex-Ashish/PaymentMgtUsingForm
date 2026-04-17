import { NextResponse } from "next/server";

export async function proxy(request) {
  const token = await request.cookies.get("token")?.value;
  const role = await request.cookies.get("role")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/");

  const isDashboard = pathname.startsWith("/dashboard");

  if (!token && isDashboard) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && role !== "admin" && isDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*"],
};