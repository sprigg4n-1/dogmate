'use client';

import React from 'react';
import Image from 'next/image';

import close from '@/public/svg/close.svg';
import { useSession } from 'next-auth/react';
import plus from '@/public/svg/white-plues.svg';

const AddModalServiceApplication = ({
  userId,
  setIsOpen,
  closeModal,
}: {
  userId: string;
  setIsOpen: (e: React.MouseEvent<HTMLButtonElement>, value: boolean) => void;
  closeModal: () => void;
}) => {
  const onHandleSumbitCreateApp = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    closeModal();

    alert('На жаль цей функціонал не працює');
  };

  const { data: session } = useSession();

  return (
    <div className="h-screen w-screen absolute z-30 bg-lightGreen bg-opacity-70 top-0 left-0 flex justify-center items-center ">
      <div className="relative w-1/2 h-fit rounded-xl bg-white px-5 pb-12 pt-20">
        <button
          className="absolute top-3 right-3"
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(e, false);
          }}>
          <Image
            src={close}
            width={32}
            height={32}
            alt="close image"
            className="object-fit w-[32px] h-[32px]"
          />
        </button>

        <form
          onSubmit={(e) => onHandleSumbitCreateApp(e)}
          className="flex flex-col h-full w-full gap-10">
          <div className="flex gap-10">
            <div className="w-[400px] h-[270px] flex flex-col gap-2 justify-center items-center rounded-xl bg-darkGreen">
              <button className="w-10 h-10 rounded-full border-white border bg-lightGray bg-opacity-50 hover:bg-accYellow flex items-center justify-center">
                <Image
                  src={plus}
                  alt="plus"
                  className="object-fit w-[25px] h-[25px]"
                />
              </button>
              <span className="text-white text-[18px]">Додати фото</span>
            </div>
            <div className="flex flex-col gap-10 flex-1">
              <input
                type="text"
                placeholder="Напишіть заголовок до своїх послуг"
                className="text-mainBlack border-2 border-mainBlack text-[18px] py-2 px-1"
              />
              <textarea
                placeholder="Напишіть опис до своїх послуг"
                className="text-mainBlack border-2 border-mainBlack text-[18px] py-2 px-1"
              />
            </div>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <h3 className="relative px-[60px] text-[21px] flex justify-center items-center h-[40px] font-medium border-2 border-accYellow rounded-full after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:bg-accYellow after:rounded-full">
              {session?.user.name}
            </h3>
            <button
              className="py-1 px-10 bg-transparent border-2 border-accYellow rounded-full hover:bg-accYellow hover:text-white text-[18px] font-semibold text-mainDark"
              type="submit">
              Створити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModalServiceApplication;
