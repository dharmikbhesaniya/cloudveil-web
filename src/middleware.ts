import { NextRequest, NextResponse } from "next/server";

const MARKDOWN_PAGES = new Set(["/", "/privacy-policy", "/terms-of-service", "/refund-policy", "/data-deletion", "/contact"]);

export function middleware(request: NextRequest) {
  const accept = request.headers.get("accept") ?? "";
  const { pathname } = request.nextUrl;

  if (accept.includes("text/markdown") && MARKDOWN_PAGES.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/api/md";
    url.searchParams.set("path", pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/privacy-policy", "/terms-of-service", "/refund-policy", "/data-deletion", "/contact"],
};
