import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  try {
    
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json(
        { message: 'Token not found' },
        { status: 401 }
      );
    }

  
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json(
      { message: 'Invalid or expired token' },
      { status: 401 }
    );
  }
}
