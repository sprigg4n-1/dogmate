import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      surname: string;
      nickname: string;
      email: string;
      role: string;
      age: string;
      photoUrl: string;
      sex: string;
      description: string;
      isVerified: boolean;
    };
  }
}
