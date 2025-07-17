import {connectDB} from '@/lib/db';
import Invoice from '@/models/Invoice';

export async function GET(req, context) {
  await connectDB();

  const params = await context.params; 
  const id = params.id;

  const inv = await Invoice.findById(id).populate('clientId', 'name');

  if (!inv) return new Response(null, { status: 404 });
  return new Response(JSON.stringify(inv), { status: 200 });
}

export async function PUT(req,{params}) {
  await connectDB();
  const body = await req.json();
  
  let totalAmount = 0;
  body.items.forEach(item=>{
    item.total = item.quantity*item.price;
    totalAmount += item.total;
  });
  const updated = await Invoice.findByIdAndUpdate(params.id,
    { ...body, totalAmount },
    { new:true }
  );
  return new Response(JSON.stringify(updated),{status:200});
}

export async function DELETE(req,{params}) {
  await connectDB();
  await Invoice.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message:'Deleted'}),{status:200});
}
