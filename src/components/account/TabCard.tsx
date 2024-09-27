import React from 'react';

import Image, { StaticImageData } from 'next/image';

import Triangle from '@/public/test-account/triangle.svg';

type TabCardProps = {
  id: number;
  photoUrl: StaticImageData | string;
  title: string;
  description: string;
};

const TabCard = ({ photoUrl, title, description }: TabCardProps) => {
  return (
    <div className="relative z-0 w-[395px] h-auto rounded-3xl overflow-hidden">
      <Image src={photoUrl} alt="bg image" className="object-fit" />
      <div className="absolute w-full bottom-0 left-0 z-1 flex p-[30px] justify-between items-end">
        <div className="text-white w-[220px] flex flex-col gap-6">
          <h3 className="text-[32px] tracking-widest uppercase font-medium">
            {title}
          </h3>
          <p className="text-[16px] text-white">{description}</p>
        </div>
        <button className="h-[70px] w-[70px] rounded-full bg-silver bg-opacity-20 flex items-center justify-center border-2 border-white hover:bg-opacity-100">
          <Image
            src={Triangle}
            width={19}
            height={19}
            alt="triangle"
            className="ml-1"
          />
        </button>
      </div>
    </div>
  );
};

export default TabCard;
