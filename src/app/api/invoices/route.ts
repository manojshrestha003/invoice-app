import { connectDB } from '@/lib/db';
import Invoice from '@/models/Invoice';
import { getUserFromRequest } from '@/lib/auth';


interface InvoiceItem {
  quantity: number;
  price: number;
  total?: number;
}

interface InvoiceRequestBody {
  items: InvoiceItem[];
  clientId: string;
  issueDate: string;
  dueDate: string;
  status: string;
  notes?: string;
  [key: string]: any; 
}


export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const invoices = await Invoice.find({ userId: user.id }).populate('clientId', 'name');
  return new Response(JSON.stringify(invoices), { status: 200 });
}


export async function POST(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  const body = await req.json() as InvoiceRequestBody;

  let totalAmount = 0;
  body.items.forEach((item) => {
    item.total = item.quantity * item.price;
    totalAmount += item.total;
  });

  const invoice = new Invoice({
    ...body,
    totalAmount,
    userId: user.id, 
  });

  const saved = await invoice.save();
  return new Response(JSON.stringify(saved), { status: 201 });
}
