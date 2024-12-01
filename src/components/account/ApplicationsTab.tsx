'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

import ApplicationCard from './ApplicationCard';
import testPhoto from '@/public/test-applications.png';
import Plus from '@/public/svg/plus.svg';
import Image from 'next/image';
import AddApplicationModal from '../dog/AddApplicationModal';
import AddModalServiceApplication from './AddModalServiceApplication';

const ApplicationsTab = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const onHandleClickOpenModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: boolean
  ) => {
    e.preventDefault();
    setIsOpenModal(value);
  };

  const [applications, setApplications] = useState([
    {
      id: 1,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 5.0,
    },
  ]);

  return (
    <div className="px-[50px] py-[25px] flex flex-wrap gap-[70px] items-center">
      {isOpenModal && (
        <AddModalServiceApplication
          userId={id}
          setIsOpen={onHandleClickOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
      {applications.map((item) => (
        <ApplicationCard
          key={item.id}
          photoUrl={item.photoUrl}
          title={item.title}
          description={item.description}
          rating={item.rating}
        />
      ))}
      {session?.user?.id === id ? (
        <button
          onClick={(e) => onHandleClickOpenModal(e, true)}
          className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
          <Image src={Plus} alt="plus btn" width={23} height={23} />
        </button>
      ) : null}
    </div>
  );
};

export default ApplicationsTab;
