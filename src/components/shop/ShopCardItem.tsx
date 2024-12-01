'use client';

import React from 'react';

import { useCart } from '@/hooks/useCart';

import Image from 'next/image';
import Link from 'next/link';
import basketImage from '@/public/svg/plus-basket.svg';

import { DogProductProps } from '@/types/types';

const ShopCardItem = ({ prod }: { prod: DogProductProps }) => {
  const { addToCart } = useCart();

  console.log(prod);

  const handleAddToBasket = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    console.log(id);

    addToCart({
      id: id,
      name: prod.name,
      price: +prod.price,
      photoUrl: prod.imageUrl,
      count: 1,
      isAvailable: prod.stockAvailable,
    });

    alert('Ви додали предмет до кошика');
  };

  return (
    <div className="w-[350px] h-[400px] flex flex-col">
      <Link
        href={`/product/${prod.productId}`}
        className="bg-lightGreen text-[22px] font-bold text-center py-1 text-white h-[50px] hover:text-yellow-400 duration-300">
        {prod.name.length > 15 ? `${prod.name.slice(0, 15)}...` : prod.name}
      </Link>
      <div className="relative flex-1 w-[350px] h-[300px] group">
        <Image
          src={prod.imageUrl}
          width={350}
          height={300}
          alt="product photo"
          className="object-fit w-[350px] h-[300px]"
        />
        <div className="absolute hidden w-full h-full bg-mainDark bg-opacity-90 top-0 left-0 group-hover:flex flex-col items-center justify-center px-5 py-2 text-center gap-5">
          <p className="text-[22px] text-white">{prod.description}</p>
          <span className="text-[22px] text-yellow-400 font-bold">
            {prod.price}$
          </span>
        </div>
      </div>

      <div className="bg-lightGreen flex justify-center items-center p-1 h-[50px]">
        <div className="flex justify-between mt-auto py-1 px-3 bg-darkGreen w-full">
          <span className="text-[22px] text-white"> Add to shopping cart </span>
          <button onClick={(e) => handleAddToBasket(e, prod.productId)}>
            <Image
              src={basketImage}
              width={32}
              height={30}
              alt="basket"
              className="object-fit w-[32px] h-[30px] hover:fill-white hover:brightness-0 hover:invert"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopCardItem;
