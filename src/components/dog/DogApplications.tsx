'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Plus from '@/public/svg/plus.svg';
import { useSession } from 'next-auth/react';
import { getApplicationsByDogId } from '@/services/TindogService';
import { TinDogApplication, UserDogProps } from '@/types/types';
import DogApplicationCard from './DogApplicationCard';
import AddApplicationModal from './AddApplicationModal';
import Link from 'next/link';

const DogApplications = ({
  userId,
  dog,
}: {
  userId: string;
  dog: UserDogProps;
}) => {
  const [applications, setApplications] = useState<TinDogApplication[]>([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: session } = useSession();

  const onHandleClickOpenModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: boolean
  ) => {
    e.preventDefault();
    setIsOpenModal(value);
  };

  useEffect(() => {
    const getData = async () => {
      const apls = await getApplicationsByDogId(dog.id);

      const newApls = apls.map((item: TinDogApplication) => item);

      setApplications(newApls);
    };

    getData();
  }, [applications]);

  return (
    <div
      className={`flex flex-wrap gap-[70px] px-20 py-10 items-center ${
        applications.length > 0 ? '' : 'justify-center h-full'
      }`}>
      {isOpenModal && (
        <AddApplicationModal
          dogId={dog.id}
          setIsOpen={onHandleClickOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
      {applications.map((item) => (
        <DogApplicationCard
          key={item.id}
          userId={userId}
          dog={dog}
          application={item}
        />
      ))}
      {session?.user?.id === userId ? (
        <button
          onClick={(e) => onHandleClickOpenModal(e, true)}
          className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
          <Image src={Plus} alt="plus btn" width={23} height={23} />
        </button>
      ) : null}
    </div>
  );
};

export default DogApplications;
