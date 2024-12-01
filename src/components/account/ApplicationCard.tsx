import React from 'react';

import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

type TabCardProps = {
  id?: number;
  photoUrl: StaticImageData | string;
  title: string;
  description: string;
  rating: number;
};

const ApplicationCard = ({
  id,
  photoUrl,
  title,
  description,
  rating,
}: TabCardProps) => {
  return (
    <div className="bg-lightGray rounded-xl w-[400px] h-[450px] flex flex-col overflow-hidden justify-center">
      <div className="px-5 py-4 text-right text-[32px] text-mainDark font-bold">
        {rating.toFixed(1)}
      </div>
      <div className="relative w-[400px] h-[300px] group">
        <Image
          src={photoUrl}
          alt="application photo"
          width={400}
          height={300}
          className="object-fit w-[400px] h-[300px]"
        />
        <div className="hidden absolute group-hover:flex w-full h-full bg-mainBlack bg-opacity-80 top-0 left-0 justify-center items-center p-3 text-[22px] text-white text-center">
          {description}
        </div>
      </div>
      <Link
        href={`/application/${id}`}
        className="mt-auto px-5 py-4 font-semibold text-[32px] text-center flex justify-center items-center hover:scale-110">
        {title}
      </Link>
    </div>
  );
};

export default ApplicationCard;
