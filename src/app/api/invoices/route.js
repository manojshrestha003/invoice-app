import {connectDB} from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function GET() {
  await connectDB();
  const invoices = await Invoice.find().populate('clientId','name');
  return new Response(JSON.stringify(invoices), { status: 200 });
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  
  let totalAmount = 0;
  body.items.forEach(item => {
    item.total = item.quantity * item.price;
    totalAmount += item.total;
  });
  const inv = new Invoice({ ...body, totalAmount });
  const saved = await inv.save();
  return new Response(JSON.stringify(saved), { status: 201 });
}
