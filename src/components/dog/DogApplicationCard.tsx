'use client';

import React from 'react';

import { TinDogApplication, UserDogProps } from '@/types/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import deleteIcon from '@/public/svg/close.svg';
import { createApplication, deleteApplication } from '@/services/TindogService';

const DogApplicationCard = ({
  userId,
  dog,
  application,
}: {
  userId: string;
  dog: UserDogProps;
  application: TinDogApplication;
}) => {
  const { data: session } = useSession();

  const onHandleClickDeleteApplication = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    await deleteApplication(id);

    alert('ви видалили заявку собачки');
  };

  return (
    <div className="w-[430px] h-[460px] relative rounded-xl overflow-hidden flex flex-col group">
      <Image
        src={dog.photoPath}
        width={430}
        height={460}
        alt="dog photo"
        className=" object-fit w-[430px] h-[460px]"
      />
      {session?.user.id === userId && (
        <button
          onClick={(e) => onHandleClickDeleteApplication(e, application.id)}
          className="absolute top-5 left-5 w-[50px] h-[50px] bg-red-500 group-hover:flex justify-center items-center rounded-full hidden hover:scale-110 duration-300">
          <Image src={deleteIcon} width={35} height={35} alt="delete" />
        </button>
      )}

      <span className="absolute text-mainBlack text-[20px] w-[100px] flex justify-center items-center top-3 right-3 bg-[#E5E1FF] px-10 rounded-xl">
        {application.applicationType}
      </span>
      <div className="absolute bottom-0 left-0 p-5 flex gap-8 justify-between items-end">
        <div className="text-white flex-1">
          <h2 className="mb-5 text-[32px] font-medium">{dog.name}</h2>
          <p className="text-[20px]">
            {application.description && application.description.length > 55
              ? `${application.description.slice(0, 55)}...`
              : application.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DogApplicationCard;
