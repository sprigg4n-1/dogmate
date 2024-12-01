import { dbConnect } from '@/lib/mongo';
import { NextResponse } from 'next/server';

import { User } from '@/queries/users';

export async function POST(req) {
  try {
    await dbConnect();
    const { inputText } = await req.json();

    let user;
    if (inputText.includes('@')) {
      user = await User.findOne({ email: inputText }).select('_id');
    } else {
      user = await User.findOne({ nickname: inputText }).select('_id');
    }
    console.log('user: ', user);

    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
