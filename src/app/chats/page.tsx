'use client';

import React, { useState } from 'react';
import accphoto from '@/public/test-account/acc-photo.png';
import Image from 'next/image';
import Link from 'next/link';

const ChatsPage = () => {
  const [accounts, setAccounts] = useState([
    {
      nickname: 'ShadowViper',
      photoUrl: 'https://random.dog/211763a6-ed82-4351-9f11-c494592f8fa5.jpg',
    },
    {
      nickname: 'StormSeeker',
      photoUrl: 'https://random.dog/214f3314-9e45-409e-8443-40bce665d7ba.JPG',
    },
    {
      nickname: 'LunarEcho',
      photoUrl: 'https://random.dog/22753e90-5e55-4061-b8c9-1923e47d0f68.JPG',
    },
    {
      nickname: 'MysticFlare',
      photoUrl: 'https://random.dog/2294c0a8-0595-4fca-869e-803e13d2ffe1.jpg',
    },
    {
      nickname: 'BlazeRider',
      photoUrl: 'https://random.dog/23361-22624-9634.jpg',
    },
    {
      nickname: 'Yukki',
      photoUrl: accphoto,
    },
  ]);

  const [activeAcc, setActiveAcc] = useState<any>({
    nickname: 'Yukki',
    photoUrl: accphoto,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="bg-mainDark flex">
        <div className=" bg-accYellow w-[400px] flex justify-between px-5 py-7">
          <button className="text-[22px] text-white hover:underline">
            Chats
          </button>
          <button className="text-[22px] text-white hover:underline">
            Groups
          </button>
          <button className="text-[22px] text-white hover:underline">
            Hidden
          </button>
        </div>

        <div className="relative flex-1 h-full">
          <div className="absolute left-0 w-0 h-0 border-t-[44px] border-b-[44px] border-l-[70px] border-transparent border-l-accYellow"></div>
          <div className="pl-[150px] flex justify-between items-center h-full">
            <div className="flex gap-4 items-center">
              <Image
                src={activeAcc.photoUrl}
                alt="acc photo"
                width={60}
                height={60}
                className="object-fit w-[70px] h-[70px] border-2 border-white rounded-full"
              />
              <Link
                href={`/account/6746691a6d5eef43cbd8f026`}
                className="text-[24px] text-lightGray">
                {activeAcc.nickname}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="bg-lightGreen w-[400px] h-full flex flex-col">
          {accounts.map((acc) => (
            <button
              key={acc.nickname}
              className={`flex items-center border-b-2 border-r-2 border-accYellow w-full px-2 py-2 text-center gap-5 ${
                activeAcc.nickname === acc.nickname
                  ? 'bg-accYellow'
                  : 'bg-transparent'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveAcc({
                  nickname: acc.nickname,
                  photoUrl: acc.photoUrl,
                });
              }}>
              <Image
                src={acc.photoUrl}
                alt="acc photo"
                width={60}
                height={60}
                className="object-fit w-[60px] h-[60px] rounded-full border-2 border-white"
              />
              <span className="text-[22px] text-lightGray">{acc.nickname}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col py-5 px-8">
          <div className="flex-1"></div>
          <div className="mt-auto flex items-center">
            <input
              type="text"
              className="flex-1 bg-white text-mainBlack py-3 px-2 text-[22px] outline-accYellow outline-1"
              placeholder="Write message..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
