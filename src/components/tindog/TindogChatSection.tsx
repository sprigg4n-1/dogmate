'use client';

import React, { useEffect, useState } from 'react';

import { getDogById } from '@/services/SocialService';
import { deleteMatching, getMatchingByDogId } from '@/services/TindogService';
import { Matching, UserDogProps } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

const TindogChatSection = ({ dog }: { dog: UserDogProps | undefined }) => {
  const [friends, setFriends] = useState<UserDogProps[]>([]);

  const [activeAcc, setActiveAcc] = useState<UserDogProps>();

  const onHandleClickDeleteMatching = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const mtchs: Matching[] = await getMatchingByDogId(dog?.id || 0);

    const deleted = mtchs.find(
      (item) => item.dogLiker == activeAcc?.id && item.dogOwner == dog?.id
    );
    const deleted2 = mtchs.find(
      (item) => item.dogOwner == activeAcc?.id && item.dogLiker == dog?.id
    );

    console.log(deleted);
    console.log(deleted2);

    await deleteMatching(deleted?.id || 0);
    await deleteMatching(deleted2?.id || 0);
    alert('ви видалили чат');
  };

  useEffect(() => {
    const getData = async () => {
      const mtchs = await getMatchingByDogId(dog?.id || 0);

      let newArr: UserDogProps[] = [];
      let uniqArr: UserDogProps[] = [];
      mtchs.map(async (item: Matching) => {
        const aplctn = await getDogById(item.dogLiker);

        newArr.push(aplctn);

        uniqArr = newArr.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setFriends(uniqArr);
      });
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-mainDark flex">
        <div className=" bg-accYellow w-[400px] flex justify-between px-5 py-7">
          <button className="text-[22px] text-white hover:underline">
            Ваші друзі!
          </button>
        </div>

        <div className="relative flex-1 h-full">
          <div className="absolute left-0 w-0 h-0 border-t-[44px] border-b-[44px] border-l-[70px] border-transparent border-l-accYellow"></div>
          <div className="pl-[150px] pr-[50px] flex justify-between items-center h-full">
            {activeAcc ? (
              <>
                <div className="flex gap-4 items-center">
                  <Image
                    src={
                      activeAcc?.photoPath ||
                      'https://i.pinimg.com/236x/38/f5/bd/38f5bd47483788959532bfa16bbabc03.jpg'
                    }
                    alt="acc photo"
                    width={60}
                    height={60}
                    className="object-fit w-[70px] h-[70px] border-2 border-white rounded-full"
                  />
                  <Link
                    href={`/dog/${activeAcc?.id}`}
                    className="text-[24px] text-lightGray">
                    {activeAcc?.name}
                  </Link>
                </div>
              </>
            ) : (
              <h2 className="text-[24px] text-lightGray">Виберіть чат</h2>
            )}
            {activeAcc && (
              <button
                onClick={(e) => onHandleClickDeleteMatching(e)}
                className="text-[24px] font-medium text-red-400 hover:text-red-500">
                Видалити
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="bg-lightGreen w-[400px] h-full flex flex-col">
          {friends.map((acc) => (
            <button
              key={acc.name}
              className={`flex items-center border-b-2 border-r-2 border-accYellow w-full px-2 py-2 text-center gap-5 ${
                activeAcc?.name === acc.name ? 'bg-accYellow' : 'bg-transparent'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveAcc(acc);
              }}>
              <Image
                src={acc.photoPath}
                alt="acc photo"
                width={60}
                height={60}
                className="object-fit w-[60px] h-[60px] rounded-full border-2 border-white"
              />
              <span className="text-[22px] text-lightGray">{acc.name}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 flex flex-col py-5 px-8">
          <div className="flex-1"></div>
          <div className="mt-auto flex items-center">
            {activeAcc && (
              <input
                type="text"
                className="flex-1 bg-white text-mainBlack py-3 px-2 text-[22px] outline-accYellow outline-1"
                placeholder="Write message..."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TindogChatSection;
