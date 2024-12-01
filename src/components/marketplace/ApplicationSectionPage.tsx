'use client';
import React, { useEffect, useState } from 'react';

import testPhoto from '@/public/test-applications.png';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { DogProductReviews } from '@/types/types';
import { getReviewsByProductId } from '@/services/ShopService';
import ReviewComponent from '../common/ReviewComponent';

type Application = {
  id: number;
  title: string;
  description: string;
  photoUrl: string | StaticImageData;
  rating: number;
  accName: string;
  obligation: string;
  email: string;
  phone: string;
  location: {
    country: string;
    city: string;
    postcode: string;
    street: string;
  };
};

const ApplicationSectionPage = ({ id }: { id: number }) => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      title: 'Dog Walking Services',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus ac nisi nec, bibendum fermentum lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus ac nisi nec, bibendum fermentum lacus.',
      photoUrl: testPhoto,
      rating: 5.0,
      accName: 'Tina',
      obligation:
        'Walking dogs for 1-2 hours daily with basic training commands.',
      email: 'tina@example.com',
      phone: '+1234567890',
      location: {
        country: 'USA',
        city: 'New York',
        postcode: '10001',
        street: '123 Elm Street',
      },
    },
    {
      id: 2,
      title: 'Dog Grooming Services',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus ac nisi nec, bibendum fermentum lacus.',
      photoUrl: testPhoto,
      rating: 3.0,
      accName: 'Mike',
      obligation:
        'Providing grooming services including baths, nail trimming, and brushing.',
      email: 'mike@example.com',
      phone: '+1234567891',
      location: {
        country: 'USA',
        city: 'Los Angeles',
        postcode: '90001',
        street: '456 Pine Avenue',
      },
    },
    {
      id: 3,
      title: 'Daily Dog Walk',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus ac nisi nec, bibendum fermentum lacus.',
      photoUrl: testPhoto,
      rating: 4.0,
      accName: 'Sasha',
      obligation:
        'Walking dogs in the park and ensuring their safety and hydration.',
      email: 'sasha@example.com',
      phone: '+1234567892',
      location: {
        country: 'Canada',
        city: 'Toronto',
        postcode: 'M4B 1B3',
        street: '789 Maple Street',
      },
    },
    {
      id: 4,
      title: 'Weekend Dog Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus ac nisi nec, bibendum fermentum lacus.',
      photoUrl: testPhoto,
      rating: 3.3,
      accName: 'Roman',
      obligation: 'Walking dogs on weekends with playtime included.',
      email: 'roman@example.com',
      phone: '+1234567893',
      location: {
        country: 'UK',
        city: 'London',
        postcode: 'SW1A 1AA',
        street: '101 Queen Street',
      },
    },
  ]);

  const [currentApp, setCurrentApp] = useState<Application>();

  const [showedReviews, setShowedReviews] = useState<DogProductReviews[]>([]);

  useEffect(() => {
    const getData = async () => {
      const rvs = await getReviewsByProductId(1);

      const newRvs = rvs.map((item: DogProductReviews) => item);

      setShowedReviews(newRvs);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log(id);
    const newArr = applications.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });

    setCurrentApp(newArr[0]);
  }, []);

  return (
    <>
      <div className="bg-lightGreen">
        <div className="flex flex-col gap-20 px-[100px] py-[50px]">
          <div className="flex gap-20">
            <Image
              src={
                currentApp?.photoUrl ||
                'https://i.pinimg.com/236x/7c/1c/a4/7c1ca448be31c489fb66214ea3ae6deb.jpg'
              }
              width={360}
              height={360}
              alt="application photo"
              className="object-fit w-[360px] h-[360px] border-4 border-white"
            />
            <div>
              <h2 className="text-[46px] text-white font-medium">
                {currentApp?.title}
              </h2>
              <span className="text-accYellow opacity-80 text-[22px]">
                {currentApp?.obligation}
              </span>

              <div className="mt-10">
                <h3 className="text-[40px] text-white font-medium">
                  Description
                </h3>
                <p className="text-lightGray opacity-80 text-[22px]">
                  {currentApp?.description}
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/chats`}
            className="bg-accYellow text-white text-[28px] font-medium px-[100px] py-1 block w-fit ml-auto hover:bg-white hover:text-accYellow">
            Chat with worker
          </Link>
        </div>

        <div className="bg-lightGray w-full py-4 text-[40px] text-mainDark text-center font-semibold">
          Rate: {currentApp?.rating}
        </div>
      </div>
      <div className="py-[50px] px-[100px] flex justify-between">
        <div className="flex flex-col w-1/2 gap-10">
          <h2 className="text-[38px] font-medium text-white">Personal data</h2>
          <ul>
            <li className="text-[28px] text-white">
              Location: {currentApp?.location.country},{' '}
              {currentApp?.location.city} {currentApp?.location.postcode},{' '}
              {currentApp?.location.street},{' '}
            </li>
            <li className="text-[28px] text-white">
              Phone: {currentApp?.phone}
            </li>
            <li className="text-[28px] text-white">
              E-mail: {currentApp?.email}
            </li>
          </ul>
        </div>
        <div className="flex flex-col w-1/2 gap-10">
          <h2 className="text-[38px] font-medium text-white">Ceritficates</h2>
          <div className="text-[28px] text-white">not yet...</div>
        </div>
      </div>
      <div className="py-[50px]">
        <div className="relative text-center">
          <h2 className=" mb-[55px] text-white text-[64px] font-medium px-[150px] py-[10px] w-fit mx-auto">
            Reviews
          </h2>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 left-0"></div>
          <div className="absolute w-1/3 border-t-4 border-lightGray top-1/2 right-0"></div>
        </div>

        <div className="flex flex-col px-[100px] gap-[20px]">
          {showedReviews.map((item) => (
            <ReviewComponent key={item.reviewId} review={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ApplicationSectionPage;
