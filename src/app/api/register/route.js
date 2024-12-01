import { dbConnect } from '@/lib/mongo';
import { NextResponse } from 'next/server';

import { createUser } from '@/queries/users';

import bcrypt from 'bcryptjs';

export const POST = async (request) => {
  const {
    email,
    nickname,
    password,
    name,
    surname,
    age,
    sex,
    role,
    description,
    isVerified,
  } = await request.json();

  await dbConnect();

  const hashedPass = await bcrypt.hash(password, 5);

  let user;

  if (role === 'user') {
    user = {
      name,
      surname,
      password: hashedPass,
      age: new Date(age),
      nickname,
      photoUrl: '',
      sex,
      description,
      role,
      isVerified,
    };
  } else {
    user = {
      name,
      surname,
      password: hashedPass,
      age: new Date(age),
      email,
      photoUrl: '',
      sex,
      description,
      role,
      isVerified,
      contactInfo: '',
      rating: '',
    };
  }

  try {
    await createUser(user);
  } catch (e) {
    console.error('Error in POST handler:', e.message, e.stack);
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 500,
    });
  }

  return new NextResponse('User has been created', {
    status: 201,
  });
};
