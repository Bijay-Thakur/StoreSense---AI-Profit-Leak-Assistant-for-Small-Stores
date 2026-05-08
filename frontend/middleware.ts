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

  // Demo: full browser refresh / address-bar loads always show login. Client-side
  // Next.js navigations send RSC requests (not Sec-Fetch-Mode: navigate), so the
  // session cookie still applies until the user reloads the page.
  const isFullDocumentLoad =
    req.headers.get("sec-fetch-mode") === "navigate" &&
    req.headers.get("sec-fetch-dest") === "document";

  if (isFullDocumentLoad) {
    const loginUrl = new URL("/login", req.url);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set("storesense_auth", "", { path: "/", maxAge: 0 });
    return res;
  }

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
