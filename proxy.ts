/**
 import { NextResponse, type NextRequest } from "next/server";

 import { unsealSession } from "@/lib/session";

 const PUBLIC_PATHS = ["/login"];

 export async function proxy(request: NextRequest) {
     const headers = new Headers(request.headers);
     const response = NextResponse.next({ request: { headers } });
     const { pathname, search } = request.nextUrl;
     const session = await unsealSession();
     const isPublic = PUBLIC_PATHS.includes(pathname);
     const isAuthenticated = Boolean(session?.session?.auth_session);

     if (!isPublic && !isAuthenticated) {
         const loginUrl = new URL("/login", request.url);
         loginUrl.searchParams.set("from", `${pathname}${search}`);
         return NextResponse.redirect(loginUrl);
     }

     if (pathname === "/login" && isAuthenticated) {
         return NextResponse.redirect(new URL("/", request.url));
     }

     return response;
 }
 export const proxyConfig = {
     matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
 };


 */

import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const headers = new Headers(request.headers);
    const response = NextResponse.next({ request: { headers } });

    return response;
}
