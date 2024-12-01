'use client';

import { getDogById } from '@/services/SocialService';
import { TinDogApplication, UserDogProps } from '@/types/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ButtonBestApplication = ({
  application,
  activeItem,
  setActiveItem,
}: {
  application: TinDogApplication;
  activeItem: number;
  setActiveItem: (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => void;
}) => {
  const [appDog, setAppDog] = useState<UserDogProps>();

  useEffect(() => {
    const getData = async () => {
      const dg = await getDogById(application.dogId);

      setAppDog(dg);
    };

    getData();
  }, []);

  return (
    <button
      onClick={(e) => setActiveItem(e, application.id)}
      className="border border-mainBlack">
      <div
        className={`flex gap-5 relative p-5 text-black ${
          activeItem === application.id ? 'bg-accYellow ' : 'bg-white'
        } `}>
        <span
          className={`absolute top-0 right-5 text-[30px]  ${
            activeItem === application.id ? 'text-white ' : 'text-accYellow'
          } `}>
          {application.rating}
        </span>

        <Image
          src={
            appDog?.photoPath ||
            'https://i.pinimg.com/236x/79/2f/6e/792f6e1729a0b859b73487893b633777.jpg'
          }
          width={190}
          height={160}
          alt="dog photo"
          className="object-fit w-[190px] h-[160px]"
        />
        <div className="flex flex-col items-start">
          <h2 className="text-[36px] font-medium">{appDog?.name}</h2>
          <p className="text-[20px] w-[300px] text-left">
            {application?.description}
          </p>
        </div>
      </div>
    </button>
  );
};

export default ButtonBestApplication;
