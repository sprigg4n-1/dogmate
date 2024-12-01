'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SettingsTab = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const onHandleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('На жаль, цей функціонла ще не працює');
  };

  return (
    <div className="flex h-full">
      {/* tabs */}
      <ul className="flex flex-col h-full bg-lightGreen bg-opacity-50">
        <li>
          <button className="px-[58px] py-[23px] text-[24px] text-white hover:bg-mainDark">
            Changing own data
          </button>
        </li>
        <li className="mt-auto">
          <button
            className="px-[58px] py-[23px] text-[24px] text-white hover:bg-red-500 w-full"
            onClick={async (e) => {
              e.preventDefault();

              signOut();
              router.replace('/auth');
            }}>
            log out
          </button>
        </li>
      </ul>

      {/* forms of tab */}
      <div className="flex-1 h-full">
        <form
          className="py-10 px-[60px] flex flex-col gap-[25px]  h-full"
          onSubmit={onHandleSubmit}>
          <label>
            <span className="text-[24px] text-white font-medium">
              Змінити ім'я і фамілію:
            </span>
            <div className="mt-5 flex justify-between gap-20">
              <input
                type="text"
                placeholder={session?.user.name}
                className="w-1/2 py-1 px-2 text-[22px] text-mainDark"
              />
              <input
                type="text"
                placeholder={session?.user.surname}
                className="w-1/2 py-1 px-2 text-[22px] text-mainDark"
              />
            </div>
          </label>

          <label>
            <span className="text-[24px] text-white font-medium">
              Змінити {session?.user.role === 'user' ? 'нікнейм' : 'пошту'}
            </span>
            <div className="mt-5 flex justify-between gap-20">
              <input
                type="text"
                placeholder={
                  session?.user.role === 'user'
                    ? session?.user.nickname
                    : session?.user.email
                }
                className="w-1/2 py-1 px-2 text-[22px] text-mainDark"
              />
            </div>
          </label>
          <label>
            <span className="text-[24px] text-white font-medium">
              Змінити пароль
            </span>
            <div className="mt-5 flex justify-between gap-20">
              <input
                type="text"
                placeholder="новий пароль"
                className="w-1/2 py-1 px-2 text-[22px] text-mainDark"
              />
            </div>
          </label>
          <label>
            <span className="text-[24px] text-white font-medium">
              Змінити вік
            </span>
            <div className="mt-5 flex justify-between gap-20">
              <input
                type="date"
                placeholder="новий пароль"
                className="w-1/2 py-1 px-2 text-[22px] text-mainDark"
              />
            </div>
          </label>
          <button
            className="block w-[135px] mt-auto text-center py-[6px] text-white text-[20px] tracking-widest bg-accYellow ml-auto rounded-md hover:bg-yellow-400 duration-300"
            type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SettingsTab;
