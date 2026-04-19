import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/userInfo") ;

  if (!token && isProtected) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/dashboard/:path*", "/userInfo/:path*", "/userInfo", "/"],
};