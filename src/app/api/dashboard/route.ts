import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Invoice from '@/models/Invoice';
import { ClientModel as Client } from '@/models/client';
import { connectDB } from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(cookieHeader.split(';').map(c => {
    const [key, ...v] = c.trim().split('=');
    return [key, decodeURIComponent(v.join('='))];
  }));
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parseCookies(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized - No token' }, { status: 401 });
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    const userId =
      typeof decoded === 'object' && decoded !== null && 'id' in decoded
        ? decoded.id
        : null;

    if (!userId) {
      throw new Error('Invalid token payload');
    }

    await connectDB();

    const invoices = await Invoice.find({ userId })
      .populate('clientId', 'name')
      .sort({ date: -1 });

    const totalInvoices = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
    const pendingPayments = invoices
      .filter((inv) => inv.status === 'PENDING')
      .reduce((acc, inv) => acc + inv.totalAmount, 0);

    const totalClients = await Client.countDocuments({ userId });

    const recentInvoices = invoices.slice(0, 5).map((inv) => ({
      id: inv._id,
      totalAmount: inv.totalAmount,
      status: inv.status,
      date: inv.date,
      client: inv.clientId?.name || 'Unknown',
    }));

    return NextResponse.json({
      totalInvoices,
      pendingPayments,
      totalClients,
      recentInvoices,
    });
  } catch (err: any) {
    console.error('JWT Verification Error:', err.message);
    return NextResponse.json({ error: 'Invalid token', detail: err.message }, { status: 401 });
  }
}
