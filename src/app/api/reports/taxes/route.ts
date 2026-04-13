import { connectDB } from '@/lib/db';
import Expense from '@/models/Expense';
import Invoice from '@/models/Invoice';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    // Aggregate Taxes from Invoices
    const invoices = await Invoice.find({ userId: user.id, status: 'PAID' });
    const totalTaxCollected = invoices.reduce((acc, inv) => acc + (inv.taxAmount || 0), 0);

    // Aggregate Taxes paid via Expenses
    const expenses = await Expense.find({ userId: user.id });
    const totalTaxPaid = expenses.reduce((acc, exp) => acc + (exp.taxAmount || 0), 0);

    return new Response(JSON.stringify({
      totalTaxCollected,
      totalTaxPaid,
      netTaxLiability: totalTaxCollected - totalTaxPaid
    }), { status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
