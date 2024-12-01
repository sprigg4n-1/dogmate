'use client';

import React, { useEffect, useState } from 'react';

import Paw from '@/public/svg/paw.svg';
import Send from '@/public/svg/send.svg';
import { UserDogProps, UserPostProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import { getDogById } from '@/services/SocialService';

const FullViewComponent = ({ post }: { post: UserPostProps | undefined }) => {
  const [postUser, setPostUser] = useState<any>();
  const [currDog, setCurrDog] = useState<UserDogProps>();

  useEffect(() => {
    const getData = async () => {
      const dog = await getDogById(post?.dogId || 0);

      console.log(dog);

      setCurrDog(dog);
    };

    getData();
  }, []);

  useEffect(() => {
    const userId = post?.userId;
    console.log(userId);
    const getUser = async () => {
      try {
        const res = await fetch('/api/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setPostUser(data.user);
      } catch (e) {
        console.log('Error find user: ' + e);
        return null;
      }
    };

    getUser();
  }, []);

  return (
    <div className="bg-lightGreen p-[55px] flex gap-[100px] w-full">
      <Image
        src={post?.photoPath || ''}
        width={600}
        height={600}
        alt="post photo"
        className="object-cover border-2 border-white w-[600px] h-[600px] cursor-pointer"
      />

      <div className="flex flex-col flex-1 h-[350px]">
        <div className="flex justify-between items-center">
          <Link
            href={`/account/${post?.userId}`}
            className="text-[38px] text-lightGray">
            {postUser?.nickname}
          </Link>
          <p className="block h-fit bg-accYellow text-[22px] font-semibold text-lightGray px-[50px] rounded-2xl">
            {currDog?.name}
          </p>
        </div>
        <p className="mt-[25px] mb-[60px] text-lightGray text-[20px]">
          {post?.description}
        </p>

        <div className="mt-auto">
          <div className="flex items-center">
            <button className="flex-1 pr-2 pl-5 bg-lightGray border-2 border-lightGray h-9 text-mainDark text-[18px]">
              Comment
            </button>
            <div className="bg-darkGreen border-2 border-lightGray flex gap-10 items-center h-9 px-10">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">{post?.likes}</span>
                <button>
                  <Image src={Paw} width={20} height={20} alt="like post" />
                </button>
              </div>

              <button>
                <Image src={Send} width={25} height={18} alt="sent to user" />
              </button>
            </div>
          </div>
          <div className="px-5 py-3 border-2 border-lightGray border-t-0 h-[120px] overflow-hidden overflow-y-scroll"></div>
        </div>
      </div>
    </div>
  );
};

export default FullViewComponent;
