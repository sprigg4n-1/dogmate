'use client';

import React, { useState } from 'react';
import { createDog } from '@/services/SocialService';
import { DogAge, DogSex } from '@/types/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Plus from '@/public/svg/plus-2.svg';
import plusTrans from '@/public/svg/plus-transparent.svg';
import Image from 'next/image';
const QUETES = [
  'У тебе є вороги? Добре. Значить, у своєму житті ти щось колись відстоював.',
  'Ораторське мистецтво немислиме, якщо оратор не опанував досконало предмет, про який хоче говорити.',
  'Впади сім разів, піднімися вісім',
  'У спілкуванні найважливіше – чути те, що не сказано.',
  'Або ви керуєте вашим днем, або день управляє вами.',
  'Всі діти - художники. Проблема в тому, щоб залишитися художником, коли стаєш дорослим.',
  'Побороти дурні звички легше сьогодні, ніж завтра',
  'Без здоров’я неможливо і щастя.',
  'Хто розраховує забезпечити собі здоров’я, перебуваючи в ліні, той чинить так само безглуздо, як і людина, думаючий мовчанням удосконалити свій голос.',
  'Вмирає тільки кволе і слабке, здорове і сильне завжди виходить переможцем у боротьбі за існування.',
];

const DogCreate = () => {
  const { data: session } = useSession();
  const route = useRouter();
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

  const RANDOM_QUETES = QUETES[Math.floor(Math.random() * QUETES.length)];

  const onHandleSumbitCreateDog = async (
    e: React.MouseEvent<HTMLButtonElement>
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
      session?.user.id || ''
    );

    alert('Ви успішно додали собачку до свого акаунта');

    route.replace(`/account/${session?.user.id}`);
  };

  return (
    <div className="absolute top-0 left-0 z-20 w-full bg-lightGreen min-h-screen">
      <div className="w-full bg-lightGray text-mainBlack text-right py-2 px-10 text-[18px]">
        <Link
          className="hover:text-accYellow"
          href={`/account/${session?.user.id}`}>
          Назад
        </Link>
      </div>
      <div className="py-[60px] flex justify-center">
        <div className="flex h-fit w-[1400px]">
          <button className="flex justify-center items-center bg-accYellow w-[400px] hover:opacity-85 duration-300">
            <Image src={Plus} alt="plus" />
          </button>
          <div className="flex-1 text-center py-[40px] px-[50px] bg-darkGreen flex flex-col">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex flex-col bg-lightGray rounded-lg py-5 px-5 text-mainDark text-[28px] h-[275px] resize-none"
              placeholder={
                RANDOM_QUETES.length > 150
                  ? `${RANDOM_QUETES.slice(0, 150)}...`
                  : RANDOM_QUETES
              }
            />
          </div>
        </div>
      </div>
      <div className="border-t-accYellow border-t-4 border-b-accYellow border-b-4 bg-darkGreen w-full py-[50px] px-[100px]">
        <h2 className="text-white text-[46px] font-medium mb-10">
          Введіть інформацію про собаку
        </h2>
        <div className="flex justify-between items-center  gap-20">
          <div className="w-1/2 flex flex-col gap-5">
            <label className="flex items-center w-full justify-between gap-10">
              <span className="text-[44px] text-white">Ім'я:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-mainBlack text-[30px] py-1 px-2 w-[66%]"
                placeholder="ім`я"
              />
            </label>
            <label className="flex items-center justify-between w-full gap-10">
              <span className="text-[44px] text-white">Стать:</span>
              <div className="flex justify-between items-center w-[66%]">
                <button
                  className={`py-1 px-10 text-[32px] border-2 border-lightGray ${
                    sex === DogSex.MALE
                      ? 'bg-accYellow text-white'
                      : 'bg-white text-mainDark'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSex(DogSex.MALE);
                  }}>
                  {DogSex.MALE}
                </button>
                <button
                  className={`py-1 px-10 text-[32px] border-2 border-lightGray ${
                    sex === DogSex.FEMALE
                      ? 'bg-accYellow text-white'
                      : 'bg-white text-mainDark'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSex(DogSex.FEMALE);
                  }}>
                  {DogSex.FEMALE}
                </button>
              </div>
            </label>
            <label className="flex items-center justify-between w-full gap-10">
              <span className="text-[44px] text-white">Вид:</span>
              <input
                type="text"
                value={kind}
                onChange={(e) => setKind(e.target.value)}
                required
                className="text-mainBlack text-[30px] py-1 px-2 w-[66%]"
                placeholder="вид"
              />
            </label>
            <label className="flex justify-between items-center w-full gap-10 ">
              <span className="text-[44px] text-white">Вік:</span>
              <select
                className="w-[66%] text-[30px] py-1 px-2"
                value={age}
                onChange={(e) => setAge(e.target.value)}>
                <option value={DogAge.UNKNOWN}>{DogAge.UNKNOWN}</option>
                <option value={DogAge.PUPPY}>{DogAge.PUPPY}</option>
                <option value={DogAge.ADULT}>{DogAge.ADULT}</option>
                <option value={DogAge.SENIOR}>{DogAge.SENIOR}</option>
              </select>
            </label>
          </div>
          <div className="flex w-1/2 justify-center items-center">
            <button className="flex items-center gap-5 bg-accYellow rounded-full py-2 px-2 pr-5">
              <Image
                src={plusTrans}
                alt="plus phot"
                width={56}
                height={56}
                className="object-fit w-[56px] h-[56px]"
              />
              <span className="text-[38px] font-medium text-white">
                Додати документи
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-[50px] flex justify-center items-center">
        <button
          className="text-[48px] py-1 px-20 bg-accYellow text-white text-medium hover:bg-yellow-400 rounded-full"
          onClick={(e) => onHandleSumbitCreateDog(e)}>
          Створити
        </button>
      </div>
    </div>
  );
};

export default DogCreate;
