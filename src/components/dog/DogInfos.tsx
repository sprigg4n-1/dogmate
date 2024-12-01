import React from 'react';
import Image from 'next/image';

import Plus from '@/public/svg/plus.svg';
import { UserDogProps } from '@/types/types';

const DogInfos = ({ dog }: { dog: UserDogProps }) => {
  return (
    <div className="flex flex-col w-full gap-5 py-5 px-10">
      <div className="flex justify-between items-center">
        <h2 className="text-[58px] font-bold text-white tracking-widest">
          {dog.name}
        </h2>
        <span className="text-[42px] font-semibold text-accYellow">
          {dog?.rating.toFixed(1) || dog.kind}
        </span>
      </div>
      <ul className="text-lightGray text-[20px]">
        <li>
          Kind: <span className="font-medium">{dog.kind}</span>
        </li>
        <li>
          Sex: <span className="font-medium">{dog.sex}</span>
        </li>
        <li>
          Age: <span className="font-medium">{dog.age}</span>
        </li>
      </ul>
      <p className="text-[26px] text-white">
        {dog?.description ||
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi ullam sed, aut ut totam maxime quas perspiciatis aspernatur nihil ducimus hic est eum tenetur fuga odio deserunt magni nam voluptatum?'}
      </p>
      <div className="flex-1 mt-auto">
        <h3 className="mb-5 text-[58px] font-bold text-white tracking-widest">
          Documents
        </h3>
        <div className="bg-lightGreen rounded-xl py-5 px-20 text-white flex justify-between gap-[250px]">
          <div className="w-1/2">
            <h4 className="text-[24px] font-medium mb-3">Паспорт</h4>
            <div className="bg-accYellow flex justify-center items-center w-full h-[300px] rounded-md">
              <button className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
                <Image src={Plus} alt="plus btn" width={23} height={23} />
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <h4 className="text-[24px] font-medium mb-3">Інші документи</h4>
            <div className="bg-accYellow flex justify-center items-center w-full h-[300px] rounded-md">
              <button className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
                <Image src={Plus} alt="plus btn" width={23} height={23} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DogInfos;
