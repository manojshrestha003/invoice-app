simport { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Make sure this is defined in your `.env.local` file as: JWT_SECRET=your_secret
const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify the token using your secret key
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (error) {
    console.error('Invalid token:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// This tells Next.js which routes require the middleware (protected routes)
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/invoices/:path*',
    '/profile/:path*',
    '/clients/:path*',
  ],
};
