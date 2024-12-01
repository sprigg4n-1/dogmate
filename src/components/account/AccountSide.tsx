'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import accphoto from '@/public/test-account/acc-photo.png';
import { useSession } from 'next-auth/react';
import { UserPostProps } from '@/types/types';
import { getPostsByUserId } from '@/services/SocialService';

const AccountSide = ({
  activeTab,
  onHandleChangeTab,
  id,
}: {
  activeTab: string;
  onHandleChangeTab: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
  id: string;
}) => {
  const { data: session } = useSession();

  const [user, setUser] = useState<any>();
  const [posts, setPosts] = useState<UserPostProps[]>([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/api/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setUser(data.user);
      } catch (e) {
        console.log('Error find user: ' + e);
        return null;
      }
    };

    const getData = async () => {
      const psts = await getPostsByUserId(id);

      const newPsts = psts.map((item: UserPostProps) => item);

      setPosts(newPsts);
    };

    getUser();
    getData();
  }, []);

  const showName = session?.user?.id === id ? session?.user?.name : user?.name;
  const showSurname =
    session?.user?.id === id ? session?.user?.surname : user?.surname;
  const showNickname =
    session?.user?.id === id ? session?.user?.nickname : user?.nickname;

  return (
    <div className="bg-lightGreen px-1 py-3 w-[475px] flex flex-col items-center gap-[100px]">
      <div className="flex flex-col items-center gap-[27px] w-full">
        <Image
          src={accphoto}
          alt="acc photo"
          width={120}
          height={120}
          className="object-fit rounded-full border-2 border-white drop-shadow-account"
        />
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-lightGray text-[24px] font-medium">
            {showNickname}
          </h3>
          <h5 className="text-lightGray text-[20px]">
            {showSurname} {showName}
          </h5>
        </div>
        <ul className="flex gap-1 w-full">
          <li className="flex flex-col items-center py-1 bg-lightGray text-mainBlack font-medium w-1/3 hover:bg-accYellow hover:text-lightGray cursor-pointer duration-300">
            <span className="text-[20px]">0</span>
            <p className="text-[16px]">Followers</p>
          </li>
          <li className="flex flex-col items-center py-1 bg-lightGray text-mainBlack font-medium w-1/3 hover:bg-accYellow hover:text-lightGray cursor-pointer duration-300">
            <span className="text-[20px]">0</span>
            <p className="text-[16px]">Following</p>
          </li>
          <li className="flex flex-col items-center py-1 bg-lightGray text-mainBlack font-medium w-1/3 hover:bg-accYellow hover:text-lightGray cursor-pointer duration-300">
            <span className="text-[20px]">{posts.length}</span>
            <p className="text-[16px]">Posts</p>
          </li>
        </ul>
      </div>

      <ul className="flex flex-col gap-[40px] items-center">
        <li>
          <button
            className={`font-medium text-[26px] w-[295px] rounded-full py-3 text-center ${
              activeTab == 'posts'
                ? 'text-lightGreen bg-lightGray'
                : 'text-lightGray'
            } `}
            onClick={(e) => onHandleChangeTab(e, 'posts')}>
            Posts
          </button>
        </li>
        <li>
          <button
            className={`font-medium text-[26px] w-[295px] rounded-full py-3 text-center ${
              activeTab == 'dogs'
                ? 'text-lightGreen bg-lightGray'
                : 'text-lightGray'
            } `}
            onClick={(e) => onHandleChangeTab(e, 'dogs')}>
            Dogs
          </button>
        </li>
        {session?.user?.id === id ? (
          <li>
            <button
              className={`font-medium text-[26px] w-[295px] rounded-full py-3 text-center ${
                activeTab == 'settings'
                  ? 'text-lightGreen bg-lightGray'
                  : 'text-lightGray'
              } `}
              onClick={(e) => onHandleChangeTab(e, 'settings')}>
              Settings
            </button>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default AccountSide;
