'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import TabCard from './TabCard';

import Plus from '@/public/svg/plus.svg';
import { useSession } from 'next-auth/react';
import AddDogModal from './AddDogModal';
import { UserDogProps } from '@/types/types';
import { getDogsByUserId } from '@/services/SocialService';
import Link from 'next/link';

const DogsTab = ({ id }: { id: string }) => {
  const [allDogs, setAllDogs] = useState<UserDogProps[]>([]);

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
      const dgs = await getDogsByUserId(id);

      const newDgs = dgs.map((item: UserDogProps) => item);

      setAllDogs(newDgs);
    };

    getData();
  }, [allDogs]);

  return (
    <div
      className={`flex flex-wrap gap-[70px] px-[45px] py-[30px] items-center ${
        allDogs.length > 0 ? '' : 'justify-center h-full'
      }`}>
      {/* {isOpenModal && (
        <AddDogModal
          userId={id}
          setIsOpen={onHandleClickOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />
      )} */}
      {allDogs.map((dog) => (
        <TabCard key={dog.id} userId={id} isDog dog={dog} />
      ))}
      {session?.user?.id === id ? (
        <>
          {/* <button
            onClick={(e) => onHandleClickOpenModal(e, true)}
            className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
            <Image src={Plus} alt="plus btn" width={23} height={23} />
          </button> */}
          <Link
            href={`/dog/create`}
            className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
            <Image src={Plus} alt="plus btn" width={23} height={23} />
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default DogsTab;
