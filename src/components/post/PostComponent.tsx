'use client';

import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import { UserDogProps, UserPostProps } from '@/types/types';

import Paw from '@/public/svg/paw.svg';
import Send from '@/public/svg/send.svg';
import Link from 'next/link';
import { getDogById } from '@/services/SocialService';

const PostComponent = ({
  post,
  isFullView,
}: {
  post: UserPostProps;
  isFullView: boolean;
}) => {
  const [postUser, setPostUser] = useState<any>();
  const [currDog, setCurrDog] = useState<UserDogProps>();

  useEffect(() => {
    const getData = async () => {
      const dog = await getDogById(post.dogId);

      console.log(dog);

      setCurrDog(dog);
    };

    getData();
  }, []);

  const getUser = async () => {
    try {
      const res = await fetch('/api/findUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: post?.userId }),
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isFullView ? (
        <div className="bg-lightGreen rounded-lg p-[55px] flex gap-10 w-[1200px]">
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.photoPath}
              width={582}
              height={496}
              alt="post photo"
              className="object-cover border-2 border-white w-[350px] h-[350px] cursor-pointer"
            />
          </Link>

          <div className="flex flex-col flex-1 h-[350px]">
            <div className="flex justify-between items-center">
              <Link
                href={`/account/${post.userId}`}
                className="text-[38px] text-lightGray">
                {postUser?.nickname}
              </Link>
              <p className="block h-fit bg-accYellow text-[18px] text-lightGray px-[50px] rounded-2xl">
                {currDog?.name}
              </p>
            </div>
            <p className="mt-[25px] mb-[60px] text-lightGray text-[20px]">
              {post.description}
            </p>

            <div className="mt-auto">
              <div className="flex items-center">
                <button className="flex-1 pr-2 pl-5 bg-lightGray border-2 border-lightGray h-9 text-mainDark text-[18px]">
                  Comment
                </button>
                <div className="bg-darkGreen border-2 border-lightGray flex gap-10 items-center h-9 px-10">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold">{post.likes}</span>
                    <button>
                      <Image src={Paw} width={18} height={18} alt="like post" />
                    </button>
                  </div>
                  <button>
                    <Image
                      src={Send}
                      width={25}
                      height={18}
                      alt="sent to user"
                    />
                  </button>
                </div>
              </div>
              <div className="px-5 py-3 border-2 border-lightGray border-t-0 h-[120px] overflow-hidden overflow-y-scroll"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg flex gap-10 w-[378px] h-[378px] relative overflow-hidden">
          <Link href={`/post/${post.id}`}>
            <Image
              src={post.photoPath}
              width={378}
              height={378}
              alt="post photo"
              className="object-cover rounded-lg w-[378px] h-[378px] cursor-pointer hover:scale-125 duration-300"
            />
          </Link>

          <Link
            href={`/account/${post.userId}`}
            className="absolute top-0 left-0 w-full px-5 py-2 bg-lightGray hover:bg-accYellow text-center font-medium text-mainBlack text-[22px]">
            {postUser?.nickname}
          </Link>

          <h3 className="absolute bottom-0 left-0 w-full bg-accYellow text-lightGray px-5 py-2 text-center text-[20px] font-medium">
            {currDog?.name}
          </h3>
        </div>
      )}
    </>
  );
};

export default PostComponent;
