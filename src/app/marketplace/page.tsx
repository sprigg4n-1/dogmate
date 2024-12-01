'use client';

import React, { useEffect, useState } from 'react';

import testPhoto from '@/public/test-applications.png';
import FullViewApplication from '@/components/marketplace/FullViewApplication';
import Image from 'next/image';
import Link from 'next/link';
import { getMarketplaceCategories } from '@/services/MarketplaceService';
import { MarketplaceCategories } from '@/types/types';

const images = [
  'https://i.pinimg.com/236x/be/f0/97/bef097659b560b51e6f2a33df6178dab.jpg',
  'https://i.pinimg.com/236x/4c/6a/b4/4c6ab4418f7cf82c4225eb8671f26da2.jpg',
  'https://i.pinimg.com/474x/03/c4/ba/03c4ba58dd9b7cbde9b333c4dc4b92e8.jpg',
  'https://i.pinimg.com/236x/ee/b1/7f/eeb17f0c344b642d47b81e32fa63d1f6.jpg',
  'https://i.pinimg.com/236x/4c/6a/b4/4c6ab4418f7cf82c4225eb8671f26da2.jpg',
];

const MarketplacePage = () => {
  const [allCategories, setAllCategories] = useState<MarketplaceCategories[]>(
    []
  );

  const [applications, setApplications] = useState([
    {
      id: 1,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 5.0,
      accName: 'Tina',
    },
    {
      id: 2,
      title: 'Cleaning',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 3.0,
      accName: 'Mike',
    },
    {
      id: 3,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 4.0,
      accName: 'Sasha',
    },
    {
      id: 4,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 3.3,
      accName: 'Roman',
    },
  ]);

  const [activeOffer, setActiveOffer] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const ctgs = await getMarketplaceCategories();

      const newCtgs = ctgs.map((item: MarketplaceCategories, i: number) => {
        const newItem = item;
        newItem.photoUrl = images[i];

        return newItem;
      });

      console.log(newCtgs);

      setAllCategories(newCtgs);
    };

    getData();
  }, []);

  return (
    <>
      <div className="h-screen bg-lightGreen py-[40px] flex flex-col px-[100px] gap-[125px]">
        <h2 className="text-[40px] font-bold uppercase text-white text-center">
          Найкращі пропозиція
        </h2>
        <div className="flex gap-[40px] flex-wrap items-center justify-center">
          <FullViewApplication
            id={applications[activeOffer].id}
            photoUrl={applications[activeOffer].photoUrl}
            title={applications[activeOffer].title}
            description={applications[activeOffer].description}
            rating={applications[activeOffer].rating}
            accName={applications[activeOffer].accName}
          />
        </div>
        <div className="flex justify-between gap-10">
          {Array(1, 2, 3, 4).map((_) => (
            <button
              key={_}
              className={`${
                activeOffer === _ - 1 ? 'bg-white' : 'bg-transparent'
              } border-2 w-1/4 border-white h-2`}
              onClick={(e) => {
                e.preventDefault();
                setActiveOffer(_ - 1);
              }}></button>
          ))}
        </div>
      </div>
      <div className="py-[50px]">
        <div className="border border-lightGray flex h-fit w-[1250px] mx-auto">
          <div className="relative bg-lightGreen flex flex-col w-[450px]">
            <Image
              src={testPhoto}
              width={450}
              height={300}
              alt="photo application"
              className="object-fit w-[450px] h-[300px]"
            />
            <div className="py-5 px-4 flex flex-col text-center gap-5 items-center justify-between flex-1">
              <h2 className="text-[44px] text-white">
                {applications[0].title}
              </h2>
              <p className="text-[22px] text-white">
                {applications[0].description}
              </p>
            </div>
            <div className="absolute text-[36px] py-2 px-3 border-r border-b border-lightGray text-white bg-lightGreen bg-opacity-50">
              {applications[0].rating.toFixed(1)}
            </div>
          </div>
          <div className="flex-1">
            <div className="w-full border-b border-lightGray py-8 px-[50px]">
              <h3 className="mb-4 text-[32px] text-white font-medium text-center">
                My work experience
              </h3>
              <div className="flex justify-between gap-8 w-full">
                <span className="w-[200px] py-1 bg-lightGray text-mainDark text-[22px] text-center">
                  cleaning
                </span>
                <span className="w-[200px] py-1 bg-lightGray text-mainDark text-[22px] text-center">
                  walking
                </span>
                <span className="w-[200px] py-1 bg-lightGray text-mainDark text-[22px] text-center">
                  cooking
                </span>
              </div>
            </div>
            <div className="py-8 px-[50px]">
              <h3 className="mb-4 text-[32px] text-white font-medium text-center">
                My work experience
              </h3>
              <div className="p-5 bg-lightGreen flex flex-col mt-10">
                <p className="text-[20px] text-white">
                  {applications[0].description}
                </p>
                <Link
                  href={`application/1`}
                  className="px-10 mt-5 py-1 bg-lightGray text-mainDark text-[22px] text-center ml-auto hover:bg-accYellow hover:text-white duration-300">
                  More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[100px] bg-lightGreen py-[50px]">
        <h2 className="text-[40px] font-bold mb-20 text-white">
          Browse by Category
        </h2>
        <div className="relative flex gap-10 justify-between items-center">
          {allCategories.map((item) => (
            <Link
              key={item?.name}
              href={`/marketplace-catalog`}
              className="relative w-[275px] h-[325px] hover:scale-110 cursor-pointer duration-300">
              <Image
                src={
                  item?.photoUrl ||
                  'https://i.pinimg.com/236x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg'
                }
                width={275}
                height={325}
                alt="category photo"
                className="object-fit w-[275px] h-[325px]"
              />
              <h3 className="absolute text-center left-1/2 -translate-x-1/2 w-full bg-mainDark text-white bg-opacity-70 py-2 bottom-0 text-[26px] font-bold ">
                {item?.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MarketplacePage;
