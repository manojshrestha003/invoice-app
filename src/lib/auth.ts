
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export function getUserFromRequest(req: Request): { id: string; email: string } | null {
  const cookieHeader = req.headers.get("cookie");
  if (!cookieHeader) return null;

  const tokenMatch = cookieHeader.match(/token=([^;]+)/);
  if (!tokenMatch) return null;

  const token = tokenMatch[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as { id: string; email: string };
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
