// SPDX-FileCopyrightText: 2025 SunnyMonster
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { searchParams, pathname } = request.nextUrl;

  if (
    pathname.startsWith("/posts/internal__/") ||
    pathname.startsWith("/posts/content__/")
  ) {
    return NextResponse.rewrite(new URL("/404", request.url));
  }

  if (pathname === "/posts") {
    const tag = searchParams.get("tag") || "all__";
    const page = searchParams.get("page") || "1";
    request.nextUrl.pathname = `/posts/internal__/${tag}/${page}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  const slugMatch = pathname.match(/^\/posts\/([^\/]+)$/);
  if (slugMatch) {
    const slug = slugMatch[1];
    request.nextUrl.pathname = `/posts/content__/${slug}`;
    return NextResponse.rewrite(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/posts", "/posts/:path*"],
};
