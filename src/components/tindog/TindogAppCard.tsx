'use client';

import React, { useEffect, useState } from 'react';
import { getDogById } from '@/services/SocialService';
import { TinDogApplication, UserDogProps } from '@/types/types';
import paw from '@/public/svg/paw.svg';
import Image from 'next/image';
import { createLike } from '@/services/TindogService';

const TindogAppCard = ({
  currDogId,
  application,
  isLiked = false,
}: {
  currDogId: number;
  application: TinDogApplication;
  isLiked?: boolean;
}) => {
  const [appDog, setAppDog] = useState<UserDogProps>();

  useEffect(() => {
    const getData = async () => {
      const dg = await getDogById(application.dogId);

      setAppDog(dg);
    };

    getData();
  }, []);

  const onHandleClickLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    dogId: number
  ) => {
    e.preventDefault();

    await createLike(currDogId, application.id);

    alert('Ви вподобали собаку');

    console.log(dogId);
  };

  return (
    <div className="w-[430px] h-[460px] relative rounded-xl overflow-hidden flex flex-col">
      <Image
        src={
          appDog?.photoPath ||
          'https://i.pinimg.com/236x/79/2f/6e/792f6e1729a0b859b73487893b633777.jpg'
        }
        width={430}
        height={460}
        alt="dog photo"
        className=" object-fit w-[430px] h-[460px]"
      />
      <span className="absolute text-mainBlack text-[20px] w-[150px] flex justify-center items-center top-3 right-3 bg-[#E5E1FF] px-10 rounded-xl">
        {application?.applicationType}
      </span>
      <div className="absolute bottom-0 left-0 w-full p-5 flex gap-8 justify-between items-end">
        <div className="text-white flex-1">
          <h2 className="mb-5 text-[32px] font-medium">{appDog?.name}</h2>
          <p className="text-[20px]">
            {application?.description && application.description.length > 55
              ? `${application?.description.slice(0, 55)}...`
              : application?.description}
          </p>
        </div>
        {currDogId !== appDog?.id &&
          (isLiked ? null : (
            <button
              onClick={(e) => onHandleClickLike(e, appDog?.id || 0)}
              className="w-[58px] h-[58px] flex justify-center items-center bg-white rounded-full hover:scale-110 duration-300">
              <Image
                src={paw}
                width={32}
                height={40}
                alt="like"
                className="object-fit h-[40px] w-[32px]"
              />
            </button>
          ))}
      </div>
    </div>
  );
};

export default TindogAppCard;
