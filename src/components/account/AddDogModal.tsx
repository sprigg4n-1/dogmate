'use client';

import React, { useState } from 'react';

import Image from 'next/image';

import close from '@/public/svg/close.svg';
import { createDog } from '@/services/SocialService';
import { DogAge, DogSex } from '@/types/types';

const AddDogModal = ({
  userId,
  setIsOpen,
  closeModal,
}: {
  userId: string;
  setIsOpen: (e: React.MouseEvent<HTMLButtonElement>, value: boolean) => void;
  closeModal: () => void;
}) => {
  const [photo, setPhoto] = useState([
    'https://i.pinimg.com/236x/3e/ba/70/3eba70b7600c637b789ba2f4917de26c.jpg',
    'https://i.pinimg.com/236x/06/12/5b/06125b01b5949975a898e64c32b2798f.jpg',
    'https://i.pinimg.com/236x/fa/98/82/fa988290ed5db0af24e733cdc5522158.jpg',
    'https://i.pinimg.com/236x/24/bc/1b/24bc1b4f7fe377849b845c3182f47b4c.jpg',
    'https://i.pinimg.com/236x/42/b4/d6/42b4d66ef768ffe3784127aca2cd2e7d.jpg',
    'https://i.pinimg.com/236x/58/1b/a4/581ba442f15a313f6a38aa7db80cc113.jpg',
    'https://i.pinimg.com/474x/13/23/69/13236951531b80214b9bfee45acdcd5e.jpg',
    'https://i.pinimg.com/236x/2b/80/ea/2b80eaf2e24c6d90fb6c5456e5f13fb8.jpg',
  ]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [kind, setKind] = useState('');
  const [age, setAge] = useState<string>(DogAge.UNKNOWN);
  const [sex, setSex] = useState<string>(DogSex.MALE);

  const onHandleSumbitCreateDog = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    await createDog(
      name,
      kind,
      age,
      sex,
      5,
      description,
      photo[Math.floor(Math.random() * photo.length)],
      userId
    );

    closeModal();

    alert('Ви успішно додали собачку до свого акаунта');
  };

  return (
    <div className="h-screen w-screen absolute z-30 bg-lightGreen bg-opacity-70 top-0 left-0 flex justify-center items-center ">
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
          onSubmit={(e) => onHandleSumbitCreateDog(e)}
          className="flex flex-col h-full w-full gap-5">
          <label className="flex flex-col gap-2">
            <span className="text-[22px] text-lightGray font-semibold">
              Ім'я:
            </span>
            <input
              className="py-1 px-2 text-mainDark text-[20px]"
              required
              type="text"
              placeholder="Напишіть кличку собаки"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[22px] text-lightGray font-semibold">
              Опис:
            </span>
            <textarea
              className="py-1 px-2 text-mainDark text-[20px]"
              required
              placeholder="Напишіть опис посту"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[22px] text-lightGray font-semibold">
              Вид:
            </span>
            <input
              className="py-1 px-2 text-mainDark text-[20px]"
              required
              type="text"
              placeholder="Напишіть породу собаки"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            />
          </label>

          <div className="flex gap-10">
            <select
              className="w-1/2 py-1 text-[20px] "
              value={age}
              onChange={(e) => setAge(e.target.value)}>
              <option value={DogAge.UNKNOWN}>{DogAge.UNKNOWN}</option>
              <option value={DogAge.PUPPY}>{DogAge.PUPPY}</option>
              <option value={DogAge.ADULT}>{DogAge.ADULT}</option>
              <option value={DogAge.SENIOR}>{DogAge.SENIOR}</option>
            </select>

            <select
              className="w-1/2 py-1 text-[20px] "
              value={sex}
              onChange={(e) => setSex(e.target.value)}>
              <option value={DogSex.MALE}>{DogSex.MALE}</option>
              <option value={DogSex.FEMALE}>{DogSex.FEMALE}</option>
            </select>
          </div>

          <button
            className="py-1 px-10 bg-accYellow hover:bg-yellow-400 text-[18px] font-semibold text-white mt-auto ml-auto rounded-lg"
            type="submit">
            Створити
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDogModal;
