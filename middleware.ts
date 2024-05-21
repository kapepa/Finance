import authConfig from "./auth.config"
import NextAuth from "next-auth"
import { publicRouters, authRouters, apiAuthPrefix, DEFAULT_LOGIN_REDIRECT } from "./routes";
import { Routers } from "./enum/routers";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  if (isApiAuthRoute) 
    return undefined;

  const isAuthRouters = authRouters.includes(nextUrl.pathname as Routers);
  if (isAuthRouters) {
    if (isLoggedIn) return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    return undefined ;
  }

  const isPublicRouters = publicRouters.includes(nextUrl.pathname as Routers);
  if (isPublicRouters && !isAuthRouters) {
    if (!isLoggedIn) return NextResponse.redirect(new URL(Routers.Login, nextUrl));
  }
    
  return undefined;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)", "/"],
}