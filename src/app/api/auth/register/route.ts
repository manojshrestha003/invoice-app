import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import {connectDB}from '@/lib/db';
import User from '@/models/User';


export async function POST(req:Request){
	await connectDB();

	const { username, email, password, company, address } = await req.json();

	const existingUser =  await User.findOne({email});
	if(existingUser){
		 return NextResponse.json({ message: 'User already exists' }, { status: 400 });

	}

	const hashedPassword  = await bcrypt.hash(password, 10);

	const newUser = new User({
    username,
    email,
    password: hashedPassword,
    company,
    address,
  });

	await newUser.save();
	 return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}