

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ClientModel } from "@/models/client";

export async function POST(req: Request) {
  const body = await req.json();
  await connectDB();

  const client = new ClientModel(body);
  await client.save();

  return NextResponse.json({ message: "Client added successfully" }, { status: 201 });
}

export async function GET() {
  await connectDB();
  const clients = await ClientModel.find();
  return NextResponse.json(clients);
}
