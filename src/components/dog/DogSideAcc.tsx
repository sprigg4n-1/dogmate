'use client';

import React from 'react';

import Image from 'next/image';

import { useSession } from 'next-auth/react';
import { UserDogProps } from '@/types/types';

const DogSideAcc = ({
  dog,
  activeTab,
  onHandleChangeTab,
}: {
  dog: UserDogProps;
  activeTab: string;
  onHandleChangeTab: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => void;
}) => {
  const { data: session } = useSession();

  return (
    <div className="bg-lightGreen px-1 py-3 w-[475px] flex flex-col items-center gap-[100px] rounded-t-[135px]">
      <Image
        src={dog.photoPath}
        alt="acc photo"
        width={600}
        height={600}
        className="object-fit w-[600px] h-[600px] -top-20 -left-[124px] absolute rounded-full border-[30px] border-mainDark"
      />

      <div className="absolute -top-20 -left-[124px] w-[600px] h-[600px] rounded-full border-accYellow border-[30px]"></div>
      <div className="absolute -top-20 -left-[124px] w-[600px] h-[300px]  rounded-t-full border-mainDark border-t-[30px] border-r-[30px] border-l-[30px]"></div>

      <ul className="pt-[475px] flex flex-col gap-[40px] items-center">
        <li>
          <button
            className={`font-medium text-[26px] w-[295px] rounded-full py-3 text-center ${
              activeTab == 'information'
                ? 'text-lightGreen bg-lightGray'
                : 'text-lightGray'
            } `}
            onClick={(e) => onHandleChangeTab(e, 'information')}>
            Information
          </button>
        </li>
        <li>
          <button
            className={`font-medium text-[26px] w-[295px] rounded-full py-3 text-center ${
              activeTab == 'application'
                ? 'text-lightGreen bg-lightGray'
                : 'text-lightGray'
            } `}
            onClick={(e) => onHandleChangeTab(e, 'application')}>
            Application
          </button>
        </li>
        {session?.user?.id === dog.userId ? (
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

export default DogSideAcc;
