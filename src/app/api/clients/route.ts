import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ClientModel } from "@/models/client";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clients = await ClientModel.find({ userId: user.id });
  return NextResponse.json(clients);
}

export async function POST(req: Request) {
  await connectDB();

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const client = new ClientModel({
    ...body,
    userId: user.id,
  });

  await client.save();

  return NextResponse.json({ message: "Client added successfully" }, { status: 201 });
}
