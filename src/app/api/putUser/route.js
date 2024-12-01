import { dbConnect } from '@/lib/mongo';
import { NextResponse } from 'next/server';
import { User } from '@/queries/users';

export async function POST(req) {
  try {
    // Підключаємося до бази даних
    await dbConnect();

    // Отримуємо дані з запиту
    const { inputText } = await req.json();

    // Перевіряємо, чи є у рядку символ '@' для визначення пошуку за email
    let user;
    if (inputText.includes('@')) {
      // Пошук користувача за email
      user = await User.findOne({ email: inputText }).select('_id');
    } else {
      // Пошук користувача за nickname
      user = await User.findOne({ nickname: inputText }).select('_id');
    }

    console.log('user: ', user);

    // Якщо користувач знайдений, повертаємо його id
    if (user) {
      return NextResponse.json({ user });
    } else {
      // Якщо користувача не знайдено, повертаємо відповідь з помилкою
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
