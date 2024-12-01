import { dbConnect } from '@/lib/mongo';
import { NextResponse } from 'next/server';

import { User } from '@/queries/users';

export async function POST(req) {
  try {
    await dbConnect();

    const { id } = await req.json();

    console.log(id);

    const user = await User.findById(id);
    console.log(user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
