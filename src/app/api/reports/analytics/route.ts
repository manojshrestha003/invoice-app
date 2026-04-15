import { connectDB } from '@/lib/db';
import Expense from '@/models/Expense';
import Invoice from '@/models/Invoice';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = getUserFromRequest(req);
    if (!user) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    // 1. Monthly Trends (Invoices vs Expenses)
    const invoices = await Invoice.find({ 
      userId: user.id, 
      status: 'PAID',
      date: { $gte: sixMonthsAgo }
    });

    const expenses = await Expense.find({ 
      userId: user.id,
      date: { $gte: sixMonthsAgo }
    });

    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push(d.toLocaleString('default', { month: 'short' }));
    }

    const monthlyTrends = months.map(m => ({ name: m, revenue: 0, expenses: 0 }));

    invoices.forEach(inv => {
      const m = new Date(inv.date).toLocaleString('default', { month: 'short' });
      const index = monthlyTrends.findIndex(t => t.name === m);
      if (index !== -1) monthlyTrends[index].revenue += inv.totalAmount;
    });

    expenses.forEach(exp => {
      const m = new Date(exp.date).toLocaleString('default', { month: 'short' });
      const index = monthlyTrends.findIndex(t => t.name === m);
      if (index !== -1) monthlyTrends[index].expenses += exp.amount;
    });

    // 2. Category Breakdown
    const allExpenses = await Expense.find({ userId: user.id });
    const categoryMap = allExpenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const categoryBreakdown = Object.keys(categoryMap).map(cat => ({
      name: cat,
      value: categoryMap[cat]
    }));

    // 3. Stats
    const totalRevenue = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
    const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);

    return new Response(JSON.stringify({
      monthlyTrends,
      categoryBreakdown,
      totalRevenue,
      totalExpenses,
      profit: totalRevenue - totalExpenses,
      margin: totalRevenue > 0 ? ((totalRevenue - totalExpenses) / totalRevenue) * 100 : 0
    }), { status: 200 });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
