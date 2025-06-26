// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Set up headers for all requests
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  const publicRoutes = ['/sign-in', '/sign-up'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isApiRoute = pathname.startsWith('/api/');
  const isStaticFile = pathname.includes('.') || pathname.startsWith('/_next/');

  if (isPublicRoute || isApiRoute || isStaticFile) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Check for authentication token
  const sessionToken = request.cookies.get('better-auth.session_token');
  
  if (!sessionToken) {
    // Redirect to sign-in if not authenticated
    const signInUrl = new URL('/sign-in', request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Role-based route protection
  try {
    if (pathname.startsWith('/dashboards') || pathname.startsWith('/account')) {
      const roleCheckUrl = new URL('/api/user/check-role', request.url);
      
      const roleResponse = await fetch(roleCheckUrl, {
        headers: {
          'Cookie': request.headers.get('cookie') || '',
          'User-Agent': request.headers.get('user-agent') || '',
        },
        cache: 'no-store',
      });

      if (roleResponse.ok) {
        const userData = await roleResponse.json();
        
        if (userData.role === 'STUDENT') {
          const mobileUrl = new URL('/mobile-ui', request.url);
          return NextResponse.redirect(mobileUrl);
        }
      }
    }

    if (pathname.startsWith('/mobile-ui')) {
      const roleCheckUrl = new URL('/api/user/check-role', request.url);
      
      const roleResponse = await fetch(roleCheckUrl, {
        headers: {
          'Cookie': request.headers.get('cookie') || '',
          'User-Agent': request.headers.get('user-agent') || '',
        },
        cache: 'no-store',
      });

      if (roleResponse.ok) {
        const userData = await roleResponse.json();
        
        if (userData.role !== 'STUDENT') {
          const dashboardUrl = new URL('/dashboards', request.url);
          return NextResponse.redirect(dashboardUrl);
        }
      }
    }

    if (pathname === '/') {
      const roleCheckUrl = new URL('/api/user/check-role', request.url);
      
      const roleResponse = await fetch(roleCheckUrl, {
        headers: {
          'Cookie': request.headers.get('cookie') || '',
          'User-Agent': request.headers.get('user-agent') || '',
        },
        cache: 'no-store',
      });

      if (roleResponse.ok) {
        const userData = await roleResponse.json();
        
        const redirectUrl = userData.role === 'STUDENT' 
          ? new URL('/mobile-ui', request.url)
          : new URL('/dashboards', request.url);
          
        return NextResponse.redirect(redirectUrl);
      }
    }

  } catch (error) {
    console.error('Error in middleware role check:', error);

  }

  // Default response with headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};