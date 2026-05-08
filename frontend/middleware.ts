import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const publicPaths = ["/login", "/api/auth/login"];
  const isPublic = publicPaths.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isStaticAsset =
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/products/") ||
    pathname.startsWith("/owner-avatar") ||
    pathname.startsWith("/mock-data/");

  if (isPublic || isStaticAsset) return NextResponse.next();

  const isAuthed = req.cookies.get("storesense_auth")?.value === "1";
  if (!isAuthed) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
