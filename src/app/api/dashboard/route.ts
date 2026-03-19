import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import Invoice from '@/models/Invoice';
import { ClientModel as Client } from '@/models/client';
import { connectDB } from '@/lib/db';

function parseCookies(cookieHeader = '') {
  return Object.fromEntries(cookieHeader.split(';').map(c => {
    const [key, ...v] = c.trim().split('=');
    return [key, decodeURIComponent(v.join('='))];
  }));
}

export async function GET(req: Request) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

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

    // Data for charts
    // 1. Status Distribution
    let statusChart = [
      { name: 'PAID', value: 0, fill: '#22c55e' },
      { name: 'PENDING', value: 0, fill: '#f59e0b' },
      { name: 'UNPAID', value: 0, fill: '#ef4444' }
    ];
    invoices.forEach((inv) => {
      const match = statusChart.find(s => s.name === inv.status);
      if (match) match.value += 1;
    });

    // 2. Revenue Over Time (Last 6 months)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let revenueMap: Record<string, number> = {};
    
    // Initialize last 6 months
    const today = new Date();
    for(let i=5; i>=0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      revenueMap[`${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`] = 0;
    }

    invoices.forEach((inv) => {
      const d = new Date(inv.date);
      const key = `${monthNames[d.getMonth()]} ${d.getFullYear().toString().substring(2)}`;
      if (revenueMap[key] !== undefined) {
        revenueMap[key] += inv.totalAmount;
      }
    });

    const revenueChart = Object.keys(revenueMap).map(k => ({
      name: k,
      revenue: revenueMap[k]
    }));

    return NextResponse.json({
      totalInvoices,
      pendingPayments,
      totalClients,
      recentInvoices,
      statusChart,
      revenueChart
    });
  } catch (err: any) {
    console.error('JWT Verification Error:', err.message);
    return NextResponse.json({ error: 'Invalid token', detail: err.message }, { status: 401 });
  }
}
