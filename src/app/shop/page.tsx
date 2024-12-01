'use client';

import React, { useState, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { getCategories, getProducts } from '@/services/ShopService';
import { CategoryType, DogProductProps } from '@/types/types';

import ShopCardItem from '@/components/shop/ShopCardItem';

const random = (length: number) => Math.floor(Math.random() * length);

const ShopPage = () => {
  const [currentSaleProduct, setCurrentSaleProduct] =
    useState<DogProductProps>();
  const [randomProduct, setRandomProduct] = useState<DogProductProps>();

  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');

  const [allProducts, setAllProducts] = useState<DogProductProps[]>([]);
  const [showPopular, setShowPopular] = useState<DogProductProps[]>([]);

  const [saleProductIndex, setSaleProductIndex] = useState(0);
  const [targetDate, setTargetDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const getData = async () => {
      const ctgs = await getCategories();
      const prdcts = await getProducts();

      const newCtgs = ctgs.map((item: CategoryType) => item.name);
      newCtgs.unshift('All');

      const newPrdcts = prdcts.map((item: DogProductProps) => item);

      setAllProducts(newPrdcts);
      setCategories(newCtgs);
      setShowPopular(newPrdcts);
      setCurrentSaleProduct(newPrdcts[saleProductIndex]);
      setRandomProduct(newPrdcts[random(newPrdcts.length)]);
    };

    getData();
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setShowPopular(allProducts);
    } else {
      setShowPopular(
        allProducts.filter((item) => item.category.name === activeCategory)
      );
    }
  }, [activeCategory]);

  // timer
  useEffect(() => {
    const savedTargetDate = localStorage.getItem('targetDate');
    const savedProductIndex = localStorage.getItem('saleProductIndex');

    if (savedTargetDate) {
      setTargetDate(savedTargetDate);
    } else {
      const newTargetDate = new Date(
        new Date().getTime() + 7 * 24 * 60 * 60 * 1000
      ).toISOString();
      setTargetDate(newTargetDate);
      localStorage.setItem('targetDate', newTargetDate);
    }

    if (savedProductIndex) {
      setSaleProductIndex(Number(savedProductIndex));
    }
  }, []);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const distance = target - now;

      if (distance <= 0) {
        switchSaleProduct();
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const switchSaleProduct = () => {
    const nextIndex = (saleProductIndex + 1) % allProducts.length;
    setSaleProductIndex(nextIndex);
    localStorage.setItem('saleProductIndex', nextIndex.toString());

    const newTargetDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();
    setTargetDate(newTargetDate);
    localStorage.setItem('targetDate', newTargetDate);
  };

  return (
    <>
      <div className="min-h-screen py-[50px] flex flex-col">
        <div className="text-center mb-[50px]">
          <input
            type="text"
            className="rounded-lg w-1/2 px-3 py-2 outline-accYellow text-[18px]"
            placeholder="Search..."
          />
        </div>

        <div className="flex-1 px-[200px] mb-[100px]">
          <div className="flex gap-[75px] h-full items-center justify-between">
            <div className="w-[700px] flex flex-col gap-[50px]">
              <h2 className="text-[56px] font-semibold text-white">
                {randomProduct?.name}
              </h2>

              <p className="text-[18px] text-white font-thin">
                {randomProduct?.description}
              </p>

              <Link
                className="block w-fit border-4 border-accYellow px-[70px] py-[12px] text-white uppercase font-semibold text-[22px] hover:bg-accYellow duration-300"
                href={`/product/${randomProduct?.productId}`}>
                Go to product
              </Link>
            </div>
            <div className="w-fit">
              <Image
                src={
                  randomProduct?.imageUrl ||
                  'https://i.pinimg.com/236x/fb/38/bd/fb38bd414a5564834b9f4e4fadc2f626.jpg'
                }
                width={500}
                height={550}
                alt="photo product"
                className="object-fit w-[500px] h-[550px] border-4 border-accYellow drop-shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-accYellow h-[700px] mb-[100px] ">
        <div className="border-accYellow border-8 ml-[300px] drop-shadow-lg flex">
          <div className="bg-lightGray px-[60px] py-[30px] w-[700px] flex flex-col justify-between">
            <h2 className="bg-lightGreen w-full py-[10px] block text-center text-white text-[64px] font-bold tracking-widest">
              SALE
            </h2>
            <p className="w-full pl-[20px] text-lightGreen text-[30px] border-l-2 border-lightGreen px-2 font-thin">
              {currentSaleProduct?.description}
            </p>
            <span className="text-center tracking-widest text-lightGreen text-[64px]">
              {timeLeft.days}:{timeLeft.hours}:{timeLeft.minutes}:
              {timeLeft.seconds}
            </span>
          </div>
          <Link
            href={`/product/${currentSaleProduct?.productId}`}
            className="flex-1 w-full  overflow-hidden">
            <Image
              src={
                currentSaleProduct?.imageUrl ||
                'https://i.pinimg.com/236x/fb/38/bd/fb38bd414a5564834b9f4e4fadc2f626.jpg'
              }
              width={600}
              height={600}
              alt="produtc photo"
              className="object-fit w-full  max-h-[684px] hover:scale-110 duration-300"
            />
          </Link>
        </div>
      </div>

      <div className="mb-[100px]">
        <div className="text-center">
          <h2 className="relative mb-[55px] text-white text-[64px] font-bold uppercase px-[150px] py-[30px] w-fit mx-auto">
            Best seller
            <div className="absolute w-1/2 h-1/2 border-l-8 border-t-8 border-accYellow top-0 left-0"></div>
            <div className="absolute w-1/2 h-1/2 border-l-8 border-t-8 border-accYellow bottom-0 right-0 rotate-180"></div>
          </h2>
        </div>

        <div className="flex gap-5 items-center overflow-hidden px-[100px] justify-between">
          {allProducts.slice(0, 4).map((item) => (
            <ShopCardItem key={item.productId} prod={item} />
          ))}
        </div>
      </div>

      <div className="pb-[50px]">
        <div className="text-center">
          <h2 className="relative mb-[55px] text-white text-[64px] font-bold uppercase px-[150px] py-[10px] w-fit mx-auto">
            Popular
            <div className="absolute w-1/2 h-1/2 border-t-4 border-lightGray top-0 left-0"></div>
            <div className="absolute w-1/2 h-1/2 border-t-4 border-lightGray bottom-0 right-0 rotate-180"></div>
          </h2>
        </div>
        <div className="flex flex-col gap-[50px]">
          <div className="flex bg-accYellow justify-center">
            {categories.map((item) => (
              <button
                key={item}
                className={`px-7 py-3 text-[24px] font-semibold  ${
                  activeCategory === item
                    ? 'bg-lightGray text-mainDark'
                    : 'bg-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveCategory(item);
                }}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-[50px] justify-center px-[100px]">
            {showPopular.map((item) => (
              <ShopCardItem key={item.productId} prod={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
