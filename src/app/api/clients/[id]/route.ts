import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { ClientModel } from '@/models/client';


export const runtime = 'nodejs';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }

  const client = await ClientModel.findById(id);

  if (!client) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  return NextResponse.json(client);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;
  const body = await req.json();

  const updatedClient = await ClientModel.findByIdAndUpdate(
    id,
    {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      address: body.address,
    },
    { new: true }
  );

  if (!updatedClient) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  return NextResponse.json(updatedClient);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  const deletedClient = await ClientModel.findByIdAndDelete(id);

  if (!deletedClient) {
    return NextResponse.json({ error: 'Client not found' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Client deleted successfully' });
}
