'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import close from '@/public/svg/close.svg';
import { TindogAppType } from '@/types/types';
import { createApplication } from '@/services/TindogService';

const AddApplicationModal = ({
  dogId,
  setIsOpen,
  closeModal,
}: {
  dogId: number;
  setIsOpen: (e: React.MouseEvent<HTMLButtonElement>, value: boolean) => void;
  closeModal: () => void;
}) => {
  const [photo, setPhoto] = useState([
    'https://i.pinimg.com/236x/e7/1d/fd/e71dfd5ed937b13cc79c8aa39d85fa29.jpg',
    'https://i.pinimg.com/736x/92/0c/14/920c14f1712d5403cfb37236f3484266.jpg',
    'https://i.pinimg.com/236x/d3/f7/62/d3f7623bdc0b3f1a72556bfc48fa14d3.jpg',
    'https://i.pinimg.com/236x/bb/f9/b8/bbf9b871a50b4f132fc5eec18a2bfd80.jpg',
    'https://i.pinimg.com/236x/d6/07/da/d607da3ff04191f482be01d20bbdd19e.jpg',
    'https://i.pinimg.com/236x/d9/d4/ef/d9d4ef7e7307fecbd4c653fb39c26a68.jpg',
    'https://i.pinimg.com/236x/c4/e0/5c/c4e05cca5588d228f5fda10d7e19c478.jpg',
    'https://i.pinimg.com/236x/9c/82/01/9c82018e9197d4799cae66f34ad36072.jpg',
    'https://i.pinimg.com/474x/0a/43/e8/0a43e8a873ef1de28712ae9e2ec65332.jpg',
    'https://i.pinimg.com/236x/19/bc/31/19bc318ba253cae2e2e4f4683e60a6b8.jpg',
  ]);

  const [description, setDescription] = useState('');
  const [type, setType] = useState<string>(TindogAppType.WALK);

  const onHandleSumbitCreateApplication = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(dogId);

    await createApplication(dogId, 4, description, type);

    closeModal();

    alert('Ви успішно додали заявку для свого собаки');
  };

  return (
    <div className="h-screen w-screen absolute z-30 bg-lightGreen bg-opacity-70 top-0 left-0 flex justify-center items-center">
      <div className="relative w-1/2 h-fit rounded-xl bg-darkGreen px-5 py-12">
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
          onSubmit={(e) => onHandleSumbitCreateApplication(e)}
          className="flex flex-col h-full w-full gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[22px] text-lightGray font-semibold">
              Опис:
            </span>
            <textarea
              className="py-1 px-2 text-mainDark text-[20px]"
              required
              placeholder="Напишіть опис заявки"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <select
            className="w-1/2 py-1 text-[20px] "
            value={type}
            onChange={(e) => setType(e.target.value)}>
            <option value={TindogAppType.WALK}>{TindogAppType.WALK}</option>
            <option value={TindogAppType.BREEDING}>
              {TindogAppType.BREEDING}
            </option>
            <option value={TindogAppType.BOTH}>{TindogAppType.BOTH}</option>
          </select>

          <button
            className="py-1 px-10 bg-accYellow hover:bg-yellow-400 text-[18px] font-semibold text-white mt-auto ml-auto rounded-lg"
            type="submit">
            Створити
          </button>
        </form>
        <option value=""></option>
      </div>
    </div>
  );
};

export default AddApplicationModal;
