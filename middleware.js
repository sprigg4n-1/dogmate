import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const sessionCookie = req.cookies.get('session');

  if (!sessionCookie) {
    return NextResponse.next();
  }

  try {
    const session = JSON.parse(sessionCookie);

    if (url.pathname === '/about' && session.user?.role === 'worker') {
      url.pathname = '/marketplace';
      return NextResponse.redirect(url);
    }
  } catch (error) {
    console.error('Invalid session cookie:', error);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {};
