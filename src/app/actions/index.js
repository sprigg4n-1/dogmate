// Correct import of signIn and signOut from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react';

export async function doLogout() {
  await signOut({ redirectTo: '/' });
}

export async function doCredentialLogin(inputText, confPass) {
  console.log('data', inputText, confPass);

  try {
    const response = await signIn('credentials', {
      email: inputText,
      password: confPass,
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}
