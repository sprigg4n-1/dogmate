'use client';

import React, { useEffect, useState } from 'react';

import { DogProductProps, DogProductReviews } from '@/types/types';
import { getProducts, getReviewsByProductId } from '@/services/ShopService';
import { useCart } from '@/hooks/useCart';

import Image from 'next/image';

import fillStar from '@/public/svg/fill-star.svg';
import star from '@/public/svg/star.svg';

import ReviewComponent from '../common/ReviewComponent';
import ShopCardItem from '@/components/shop/ShopCardItem';

const ProductSection = ({ product }: { product: DogProductProps }) => {
  const [allProducts, setAllProducts] = useState<DogProductProps[]>([]);
  const [allReviews, setAllReviews] = useState<DogProductReviews[]>([]);
  const [showedReviews, setShowedReviews] = useState<DogProductReviews[]>([]);

  const [showAll, setShowAll] = useState(false);

  const [count, setCount] = useState(1);

  const { addToCart } = useCart();

  const handleAddToBasket = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    addToCart({
      id: id,
      name: product.name,
      price: +product.price,
      photoUrl: product.imageUrl,
      count: count,
      isAvailable: product.stockAvailable,
    });

    alert(`Ви додали до кошики ${count} ${product.name}`);
  };

  useEffect(() => {
    const getData = async () => {
      const prdcts = await getProducts();
      const rvs = await getReviewsByProductId(product.productId);

      const newPrdcts = prdcts.map((item: DogProductProps) => item);
      const newRvs = rvs.map((item: DogProductReviews) => item);

      setAllProducts(newPrdcts);
      setAllReviews(newRvs);
      setShowedReviews(newRvs.slice(0, 3));
    };

    getData();
  }, []);

  useEffect(() => {
    if (showAll) {
      setShowedReviews(allReviews);
    } else {
      setShowedReviews(allReviews.slice(0, 3));
    }
  }, [showAll]);

  return (
    <div>
      <div className="flex gap-[200px] p-[100px]">
        <div>
          <Image
            src={product.imageUrl}
            width={800}
            height={500}
            alt="product photo"
            className="object-fit w-[800px] h-[500px]"
          />
        </div>
        <div className="flex flex-col gap-[25px]">
          <h3 className="text-[48px] font-semibold text-white">
            {product.name}
          </h3>
          <div className="flex gap-[25px]">
            <div className="flex gap-[15px]">
              {Array(Math.floor(product.rating))
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
              {Array(5 - Math.floor(product.rating))
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
            <span className="text-white text-[22px]">3 reviews</span>
          </div>
          <p className="py-[25px] text-white w-full text-[16px] font-semibold border-t-2 border-b-2 border-white">
            {product.description}
          </p>
          <ul className="flex flex-col text-lightGray text-[20px] gap-[5px]">
            <li>
              <span>Type: {product.category.name}</span>
            </li>
            <li>
              <span>Country: {product.country.name}</span>
            </li>
          </ul>

          <div className="flex justify-between">
            <div className="flex border border-lightGreen w-fit">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCount((count) => {
                    if (count > 1) {
                      return (count -= 1);
                    } else {
                      return count;
                    }
                  });
                }}
                className={`w-[70px] h-[50px] e text-[24px] text-center ${
                  count > 1
                    ? 'bg-lightGreen text-white hover:bg-accYellow'
                    : 'bg-white text-lightGreen'
                }`}>
                -
              </button>
              <span className="w-[70px] h-[50px] flex items-center justify-center text-white text-[24px]">
                {count}
              </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCount((count) => {
                    if (count < 20) {
                      return (count += 1);
                    } else {
                      return count;
                    }
                  });
                }}
                className={`w-[70px] h-[50px] bg-lightGreen text-white text-[24px] text-center ${
                  count < 20
                    ? 'bg-lightGreen text-white hover:bg-accYellow'
                    : 'bg-white text-lightGreen'
                }`}>
                +
              </button>
            </div>

            <button
              className="px-[80px] h-[50px] border border-lightGray text-white text-[24px] hover:bg-lightGray hover:text-black duration-300 "
              onClick={(e) => handleAddToBasket(e, product.productId)}>
              {(product.price * count).toFixed(2)}$
            </button>
          </div>
        </div>
      </div>
      <div className="px-[100px] py-[50px] flex flex-col gap-[30px] bg-lightGreen text-white mb-[50px]">
        <h3 className="text-[64px] uppercase font-semibold">Description</h3>
        <p className="text-[26px] font-regular">{product.description}</p>
      </div>

      <div className="mb-[50px]">
        <div className="relative text-center">
          <h2 className=" mb-[55px] text-white text-[64px] font-medium px-[150px] py-[10px] w-fit mx-auto">
            You might also like
          </h2>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 left-0"></div>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 right-0"></div>
        </div>

        <div className="flex items-center gap-[50px] justify-center px-[100px]">
          {allProducts.slice(0, 4).map((item) => (
            <ShopCardItem key={item.productId} prod={item} />
          ))}
        </div>
      </div>

      <div className="mb-[50px]">
        <div className="relative text-center">
          <h2 className=" mb-[55px] text-white text-[64px] font-medium px-[150px] py-[10px] w-fit mx-auto">
            Reviews
          </h2>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 left-0"></div>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 right-0"></div>
        </div>
        <div>
          <button
            className="mb-[50px] mx-auto block border-l-2 border-r-2 border-accYellow text-accYellow uppercase text-[20px] px-[65px] py-1 hover:bg-accYellow hover:text-white duration-300"
            onClick={(e) => {
              e.preventDefault();
              setShowAll((showAll) => !showAll);
            }}>
            {!showAll ? 'ALL REVIEWS' : 'HIDE'}
          </button>
          <div className="flex flex-col px-[100px] gap-[20px]">
            {showedReviews.map((item) => (
              <ReviewComponent key={item.reviewId} review={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
