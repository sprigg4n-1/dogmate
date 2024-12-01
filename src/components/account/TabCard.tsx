'use client';

import React, { useEffect } from 'react';

import Image from 'next/image';

import Triangle from '@/public/test-account/triangle.svg';
import Link from 'next/link';
import { TinDogApplication, UserDogProps, UserPostProps } from '@/types/types';
import paw from '@/public/svg/paw.svg';
import deleteIcon from '@/public/svg/close.svg';
import { useSession } from 'next-auth/react';
import { deleteDog, deletePost } from '@/services/SocialService';
import { useRouter } from 'next/navigation';
import {
  deleteApplication,
  getApplicationsByDogId,
} from '@/services/TindogService';

type TabCardProps = {
  userId: string;
  isDog: boolean;
  dog?: UserDogProps;
  post?: UserPostProps;
};

const TabCard = ({ userId, isDog, dog, post }: TabCardProps) => {
  const { data: session } = useSession();

  const onHandleDelete = async (id: number) => {
    if (isDog) {
      const allDogApls = await getApplicationsByDogId(id);

      console.log(allDogApls);

      allDogApls.map(async (item: TinDogApplication) => {
        await deleteApplication(item.id);
      });

      console.log(`dog - ${id}`);
      await deleteDog(id);
      alert('ви видалили собаку');
    } else {
      console.log(`post - ${id}`);
      await deletePost(id);
      alert('ви видалили пост');
    }
  };

  return (
    <div className="relative w-[335px] h-fit rounded-3xl overflow-hidden group">
      <Image
        src={
          (isDog ? dog?.photoPath : post?.photoPath) ||
          'https://i.pinimg.com/236x/79/2f/6e/792f6e1729a0b859b73487893b633777.jpg'
        }
        width={335}
        height={360}
        alt="bg image"
        className="object-fit w-[335] h-[360px] "
      />
      {session?.user.id === userId && (
        <button
          onClick={() => onHandleDelete(isDog ? dog?.id || 0 : post?.id || 0)}
          className="absolute top-5 z-20 right-5 w-[30px] h-[30px] bg-red-500 justify-center items-center rounded-full hidden group-hover:flex">
          <Image src={deleteIcon} width={25} height={25} alt="delete" />
        </button>
      )}

      <div className="absolute bottom-0 z-10 flex items-end">
        <div className="text-white w-[335px] flex flex-col px-[20px] pb-[35px]">
          <h3 className="text-[25px] tracking-widest uppercase font-bold">
            {isDog ? (
              dog?.name
            ) : (
              <div className="flex gap-2 ">
                <span>{post?.likes}</span>
                <Image src={paw} width={20} height={30} alt="likes" />
              </div>
            )}
          </h3>
          <div className="flex items-center justify-between">
            {isDog ? (
              <p className="text-[17px] text-white w-[200px]">
                {dog?.description && dog?.description.length > 35
                  ? `${dog?.description.slice(0, 35)}...`
                  : dog?.description}
              </p>
            ) : (
              <p className="text-[17px] text-white w-[200px]">
                {post?.description && post?.description.length > 35
                  ? `${post?.description.slice(0, 35)}...`
                  : post?.description}
              </p>
            )}

            {isDog ? (
              <Link
                href={`/dog/${dog?.id}`}
                className="h-[57px] w-[57px] rounded-full flex items-center justify-center border-2 border-white hover:bg-accYellow">
                <Image
                  src={Triangle}
                  width={19}
                  height={19}
                  alt="triangle"
                  className="ml-1"
                />
              </Link>
            ) : (
              <Link
                href={`/post/${post?.id}`}
                className="h-[57px] w-[57px] rounded-full flex items-center justify-center border-2 border-white hover:bg-accYellow">
                <Image
                  src={Triangle}
                  width={19}
                  height={19}
                  alt="triangle"
                  className="ml-1"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabCard;
