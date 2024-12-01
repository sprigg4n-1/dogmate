'use client';
import React, { useEffect, useState } from 'react';

import { TinDogApplication, UserDogProps } from '@/types/types';
import Image from 'next/image';
import { getDogById } from '@/services/SocialService';
import paw from '@/public/svg/paw.svg';
import { createLike } from '@/services/TindogService';

const BestApplication = ({
  currDogId,
  application,
}: {
  currDogId: number;
  application: TinDogApplication | undefined;
}) => {
  const [appDog, setAppDog] = useState<UserDogProps>();

  const onHandleClickLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    dogId: number
  ) => {
    e.preventDefault();

    await createLike(currDogId, application?.id || 0);

    alert('Ви вподобали собаку');

    console.log(dogId);
  };

  useEffect(() => {
    console.log(application?.id);
    const getData = async () => {
      const dg = await getDogById(application?.dogId || 0);

      setAppDog(dg);
    };

    getData();
  }, [application]);

  return (
    <div className="flex-1 flex justify-center items-center gap-20 px-8 bg-lightGreen border-mainBlack border-b-2 border-t-2">
      <div className="flex-1 flex flex-col justify-between h-full py-20">
        <h2 className="text-[40px] text-white font-bold">{appDog?.name}</h2>
        <div className="flex flex-col gap-10">
          <p className="text-white text-[22px]">{application?.description}</p>
          <span className="bg-white rounded-lg text-mainDark px-10 text-[20px] w-fit">
            {application?.applicationType}
          </span>
        </div>
        <div className="flex items-center gap-5">
          {currDogId === application?.dogId ? (
            <p className="text-white text-left w-fit text-[24px]">
              Ваша собака
            </p>
          ) : (
            <button
              onClick={(e) => onHandleClickLike(e, currDogId)}
              className="flex items-center gap-5 border-2 border-accYellow rounded-full pr-5 bg-accYellow duration-300">
              <div className="w-[60px] h-[60px] flex justify-center items-center border-accYellow border-2 bg-white rounded-full duration-300">
                <Image
                  src={paw}
                  width={28}
                  height={36}
                  alt="like"
                  className="object-fit h-[36px] w-[28px]"
                />
              </div>
              <span className="text-white text-left w-fit text-[24px]">
                Вподобати заявку
              </span>
            </button>
          )}
        </div>
      </div>
      <Image
        src={
          appDog?.photoPath ||
          'https://i.pinimg.com/236x/79/2f/6e/792f6e1729a0b859b73487893b633777.jpg'
        }
        width={480}
        height={480}
        alt="dog photo"
        className="object-fit w-[480px] h-[480px] rounded-xl"
      />
    </div>
  );
};

export default BestApplication;
