import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  await connectDB();

  const { id } = context.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), {
      status: 500,
    });
  }
}
