import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcrypt';

export async function GET(req: NextRequest, context: any) {
  await connectDB();

  const params = await context.params;  
  const { id } = params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: any) {
  await connectDB();

  const params = await context.params;
  const { id } = params;

  try {
    const body = await req.json();
    const { username, company, address, currentPassword, newPassword } = body;

    const user = await User.findById(id);
    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    // Update password if given
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return new Response(JSON.stringify({ message: 'Incorrect current password' }), { status: 400 });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    } else if (newPassword && !currentPassword) {
      return new Response(JSON.stringify({ message: 'Current password is required to set new password' }), { status: 400 });
    }

    // Update other fields
    if (username) user.username = username;
    if (company !== undefined) user.company = company;
    if (address !== undefined) user.address = address;

    await user.save();

    // Return user without password
    const userObj = user.toObject();
    delete userObj.password;

    return new Response(JSON.stringify(userObj), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error("User update error:", error);
    return new Response(JSON.stringify({ message: 'Server error updating user' }), { status: 500 });
  }
}
