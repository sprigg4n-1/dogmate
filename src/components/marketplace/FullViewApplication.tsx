import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React from 'react';

type TabCardProps = {
  id?: number;
  photoUrl: StaticImageData | string;
  title: string;
  description: string;
  rating: number;
  accName: string;
};

const FullViewApplication = ({
  id,
  photoUrl,
  title,
  description,
  rating,
  accName,
}: TabCardProps) => {
  return (
    <div className="bg-lightGray px-[30px] py-5 flex flex-col rounded-3xl">
      <div className="w-full text-right text-[36px] font-bold text-mainDark">
        {rating.toFixed(1)}
      </div>
      <div className="flex items-center justify-between gap-5">
        <Image
          src={photoUrl}
          width={315}
          height={215}
          alt="application photo"
          className="object-fit w-[315px] h-[215px] rounded-2xl"
        />
        <div className="flex flex-col gap-5 flex-1">
          <h3 className="text-[32px] text-mainDark font-medium">{title}</h3>
          <p className="text-[20px] text-mainDark">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-10">
        <h3 className="relative px-[60px] text-[21px] flex justify-center items-center h-[40px] font-medium border-2 border-accYellow rounded-full after:absolute after:top-0 after:left-0 after:w-[36px] after:h-[36px] after:bg-accYellow after:rounded-full">
          {accName}
        </h3>
        <Link
          href={`/application/${id}`}
          className="text-[21px] flex justify-center items-center h-[40px] font-medium border-2 border-accYellow rounded-full px-10 hover:bg-accYellow hover:text-white">
          more
        </Link>
      </div>
    </div>
  );
};

export default FullViewApplication;
