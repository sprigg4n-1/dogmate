'use client';

import React from 'react';

import { LikeApp, TinDogApplication, UserDogProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';
import Triangle from '@/public/test-account/triangle.svg';

import deleteIcon from '@/public/svg/close.svg';

import paw from '@/public/svg/paw.svg';
import {
  createMatching,
  deleteLike,
  getLikedApplications,
  getLikerApplication,
} from '@/services/TindogService';

const TindogLikerCard = ({
  myApplication,
  dog,
}: {
  myApplication: TinDogApplication;
  dog: UserDogProps;
}) => {
  const onHandleDeleteLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const like = await getLikerApplication(myApplication.id);

    console.log(like);

    const deleted = like.find((item: LikeApp) => item.dogLiker === dog.id);

    await deleteLike(deleted?.id || 0);

    alert('Ви видалили вподобання іншого');
  };

  const onHandleClickMathcing = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    await createMatching(myApplication.dogId, dog.id);
    await createMatching(dog.id, myApplication.dogId);

    alert('Взаємна сипатія, вітаю вас, переходть до чату, щоб поспілкуватись!');
  };

  return (
    <div className="w-[430px] h-[460px] relative rounded-xl overflow-hidden flex flex-col group">
      <Image
        src={
          dog?.photoPath ||
          'https://i.pinimg.com/236x/79/2f/6e/792f6e1729a0b859b73487893b633777.jpg'
        }
        width={430}
        height={460}
        alt="dog photo"
        className=" object-fit w-[430px] h-[460px]"
      />
      <div className="absolute top-0 left-0 hidden group-hover:flex w-full py-5 px-5 justify-between">
        <button
          onClick={(e) => onHandleDeleteLike(e)}
          className=" w-[50px] h-[50px] bg-red-500 justify-center items-center rounded-full flex hover:scale-110 duration-300">
          <Image src={deleteIcon} width={35} height={35} alt="delete" />
        </button>
        <button
          onClick={(e) => onHandleClickMathcing(e)}
          className="w-[50px] h-[50px] flex justify-center items-center bg-white rounded-full hover:scale-110 duration-300">
          <Image
            src={paw}
            width={28}
            height={36}
            alt="like"
            className="object-fit h-[36px] w-[28px]"
          />
        </button>
      </div>
      <div className="absolute bottom-0 z-10 flex items-end">
        <div className="text-white w-[430px] flex flex-col px-[20px] pb-[35px]">
          <h3 className="text-[25px] tracking-widest uppercase font-bold">
            {dog?.name}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-[18px] text-white w-[300px]">
              {dog?.description && dog?.description.length > 45
                ? `${dog?.description.slice(0, 45)}...`
                : dog?.description}
            </p>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TindogLikerCard;
