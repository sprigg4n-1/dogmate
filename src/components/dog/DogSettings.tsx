'use client';

import React from 'react';
import { deleteDog } from '@/services/SocialService';
import { UserDogProps } from '@/types/types';
import { useRouter } from 'next/navigation';

const DogSettings = ({ dog }: { dog: UserDogProps }) => {
  const router = useRouter();

  const onHandleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full">
      {/* tabs */}
      <ul className="flex flex-col h-full bg-lightGreen bg-opacity-50">
        <li>
          <button className="px-[58px] py-[23px] text-[24px] text-white hover:bg-mainDark">
            Changing dog data
          </button>
        </li>
        <li className="mt-auto">
          <button
            className="px-[58px] py-[23px] text-[24px] text-white hover:bg-red-500 w-full"
            onClick={async (e) => {
              e.preventDefault();
              await deleteDog(dog.id);
              router.replace(`/account/${dog.userId}`);
            }}>
            Delete
          </button>
        </li>
      </ul>

      {/* forms of tab */}
      <div className="flex-1 h-full">
        <form
          className="py-10 px-[60px] flex flex-col gap-[25px]  h-full"
          onSubmit={onHandleSubmit}>
          <button
            className="block w-[135px] mt-auto text-center py-[6px] text-white text-[20px] tracking-widest bg-accYellow ml-auto rounded-md hover:bg-yellow-400 duration-300"
            type="submit">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DogSettings;
