import React from 'react';

import Image from 'next/image';

import fillStar from '@/public/svg/fill-black-star.svg';
import star from '@/public/svg/black-star.svg';
import { DogProductReviews } from '@/types/types';

const ReviewComponent = ({ review }: { review: DogProductReviews }) => {
  return (
    <div className="rounded-full px-[28px] flex items-center border-2 border-mainDark bg-lightGray text-mainBlack">
      <div className="pr-[25px] flex items-center gap-10 w-[300px] overflow-hidden h-[80px]">
        <Image
          src={
            'https://i.pinimg.com/236x/38/f5/bd/38f5bd47483788959532bfa16bbabc03.jpg'
          }
          width={70}
          height={70}
          alt="accPhoto"
          className="object-fit border-2 rounded-full border-mainDark w-[70px] h-[70px]"
        />
        <h2 className="text-[22px]">{review.userName}</h2>
      </div>
      <div className="border-l-2 border-r-2 border-mainDark h-full min-h-[80px] py-2 px-[20px] text-[20px] flex-1 flex items-center">
        {review.comment.length > 215
          ? `${review.comment.slice(0, 216)}...`
          : review.comment}
      </div>
      <div className="pl-[20px] flex items-center justify-center">
        <div className="flex  gap-[15px]">
          {Array(Math.floor(review.rating))
            .fill(0)
            .map((_, _i) => (
              <Image
                key={_i}
                src={fillStar}
                width={25}
                height={25}
                alt="star"
              />
            ))}
          {Array(5 - Math.floor(review.rating))
            .fill(0)
            .map((_, _i) => (
              <Image
                key={22 + _i}
                src={star}
                width={25}
                height={25}
                alt="star"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
