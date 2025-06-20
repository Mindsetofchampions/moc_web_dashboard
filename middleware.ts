// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const responseHeaders = new Headers();
  
  responseHeaders.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      connect-src 'self' https://*.amazonaws.com https://*.googleapis.com https://*.google.com https://*.gstatic.com;
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.google.com https://*.gstatic.com;
      img-src 'self' data: blob: https://*.amazonaws.com https://*.s3.*.amazonaws.com https://*.googleapis.com https://*.google.com https://*.gstatic.com https://*.googleusercontent.com;
      style-src 'self' 'unsafe-inline' https://*.googleapis.com;
      font-src 'self' https://fonts.gstatic.com;
    `.replace(/\s+/g, ' ').trim()
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  responseHeaders.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};