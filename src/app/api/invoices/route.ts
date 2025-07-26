import { connectDB } from '@/lib/db';
import Invoice from '@/models/Invoice';
import { getUserFromRequest } from '@/lib/auth';

// ✅ GET all invoices for logged-in user only
export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const invoices = await Invoice.find({ userId: user.id }).populate('clientId', 'name');
  return new Response(JSON.stringify(invoices), { status: 200 });
}

// ✅ POST - Save invoice for logged-in user
export async function POST(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

  const body = await req.json();

  let totalAmount = 0;
  body.items.forEach(item => {
    item.total = item.quantity * item.price;
    totalAmount += item.total;
  });

  const invoice = new Invoice({
    ...body,
    totalAmount,
    userId: user.id, // ✅ attach userId
  });

  const saved = await invoice.save();
  return new Response(JSON.stringify(saved), { status: 201 });
}
