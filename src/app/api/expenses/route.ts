import { connectDB } from '@/lib/db';
import Expense from '@/models/Expense';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const expenses = await Expense.find({ userId: user.id }).sort({ date: -1 });
    return new Response(JSON.stringify(expenses), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const body = await req.json();
    const expense = new Expense({
      ...body,
      userId: user.id
    });

    const saved = await expense.save();
    return new Response(JSON.stringify(saved), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
