import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // Old sitemap entries exposed literal route templates. Reject them before
  // React starts streaming, so they return HTTP 404 rather than a soft 404.
  let pathname: string;
  try {
    pathname = decodeURIComponent(request.nextUrl.pathname);
  } catch {
    pathname = '[';
  }
  if (/[\[\]]/.test(pathname)) {
    return new NextResponse('Page not found.', {
      status: 404,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/articles/:path*',
    '/blogs/:path*',
    '/exhibition-directory/:path*',
    '/media-gallery/:path*',
    '/partner/:path*',
    '/sectors/:path*',
  ],
};
