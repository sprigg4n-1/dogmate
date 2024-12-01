import React from 'react';

import { useCart } from '@/hooks/useCart';
import { DogProductCartProps } from '@/types/types';
import Image from 'next/image';

const ShoppingCartItem = ({ product }: { product: DogProductCartProps }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="w-full bg-lightGreen flex">
      <div className="py-5 flex-1 px-10 flex items-center justify-between">
        <div className="flex items-center gap-[50px]">
          <Image
            src={product.photoUrl}
            alt="product photo"
            width={90}
            height={90}
            className="object-fit w-[90px] h-[90px]"
          />
          <h3 className="text-white text-[22px] font-medium">{product.name}</h3>
        </div>

        <div className="flex items-center gap-[50px] text-white text-[22px]">
          <span className="text-white">{product.price * product.count}$</span>
          <span>Amount: {product.count}</span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          removeFromCart(product.id);
        }}
        className="text-white text-[22px] duration-300 px-20 border-l-4 border-lightGray h-full bg-red-500 hover:bg-red-600">
        Delete
      </button>
    </div>
  );
};

export default ShoppingCartItem;
