import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 20,
  duration: 1,
});

export default withAuth(
  async function middleware(req) {
    const res = NextResponse.next();

    // 1. Security Headers
    // Purpose: Enables the browser's built-in XSS filter
    // '1' turns on the filter, 'mode=block' prevents the page from rendering if an attack is detected
    res.headers.set('X-XSS-Protection', '1; mode=block');
    // 2. X-Frame-Options
    // Purpose: Prevents clickjacking attacks by disallowing the page to be embedded in an iframe
    // 'DENY' means the page cannot be displayed in a frame, regardless of the site attempting to do so
    res.headers.set('X-Frame-Options', 'DENY');

    // 3. X-Content-Type-Options
    // Purpose: Prevents MIME type sniffing
    // 'nosniff' tells the browser not to try to guess the MIME type of a resource,
    // and to strictly use the type declared by the server
    res.headers.set('X-Content-Type-Options', 'nosniff');

    // 4. Referrer-Policy
    // Purpose: Controls how much referrer information should be included with requests
    res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 5. Content-Security-Policy
    // Purpose: Helps prevent a wide range of attacks, including Cross-Site Scripting (XSS) and other code injection attacks
    // This policy:
    // - default-src 'self': By default, only allow resources from the same origin
    // - script-src 'self' 'unsafe-inline' 'unsafe-eval': Allow scripts from same origin, and allow inline scripts and eval()
    // - style-src 'self' 'unsafe-inline': Allow styles from same origin and inline styles
    res.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    );

    // 2. HTTPS Redirect (for production)
    if (process.env.NODE_ENV === 'production' && !req.url.startsWith('https')) {
      return NextResponse.redirect(`https://${req.url}`, 301);
    }

    //// 3. Rate Limiting
    try {
      const ip = req.ip ?? '127.0.0.1';
      await rateLimiter.consume(ip); // 10 requests per minute
    } catch {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    // 4. Content-Type Validation for API routes
    if (req.nextUrl.pathname.startsWith('/api/')) {
      const contentType = req.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        return new NextResponse('Invalid Content-Type', { status: 415 });
      }
    }

    return res;
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/uploads', '/documents', '/documents/:path*'],
};
