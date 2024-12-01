'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import UserAccount from './UserAccount';
import WorkerAccount from './WorkerAccount';
import Link from 'next/link';

const AccountContent = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user?.role === 'user' ? (
        <UserAccount id={id} />
      ) : session?.user?.role === 'worker' ? (
        <WorkerAccount id={id} />
      ) : (
        <div className="flex flex-col gap-20 justify-center items-center px-[100px] py-[50px] w-full">
          <h1 className="text-[64px] text-white font-bold">
            Зайдіть або зерейструйтесь
          </h1>
          <Link
            className="py-3 px-16 bg-accYellow hover:bg-yellow-400 text-white font-bold text-[33px]"
            href="/auth">
            Реєстрація
          </Link>
        </div>
      )}
    </>
  );
};

export default AccountContent;
