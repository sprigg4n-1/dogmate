'use client';

import React, { useEffect, useState } from 'react';
import { LikeApp, TinDogApplication, UserDogProps } from '@/types/types';
import {
  getApplicationsById,
  getLikedApplications,
  getLikerApplication,
} from '@/services/TindogService';
import TindogLikerCard from './TindogLikerCard';
import TindogAppCard from './TindogAppCard';
import { getDogById } from '@/services/SocialService';

const NotificationSection = ({
  application,
}: {
  application: TinDogApplication[];
}) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const [type, setType] = useState<string>('Both');
  const [likedApplication, setLikedApplication] = useState<TinDogApplication[]>(
    []
  );
  const [likerDogs, setLikerDogs] = useState<UserDogProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const liked = await getLikedApplications(application[0].dogId);
      const liker = await getLikerApplication(application[0].id);

      let newAplctn: TinDogApplication[] = [];
      let uniqAplct: TinDogApplication[] = [];

      console.log(liked);
      liked.map(async (item: LikeApp) => {
        const aplctn: TinDogApplication = await getApplicationsById(
          item.applicationId
        );

        newAplctn.push(aplctn);

        uniqAplct = newAplctn.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setLikedApplication(uniqAplct);
      });

      let newDgs: UserDogProps[] = [];
      let uniqDgs: UserDogProps[] = [];
      liker.map(async (item: LikeApp) => {
        const dgs = await getDogById(item.dogLiker);

        newDgs.push(dgs);

        uniqDgs = newDgs.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );

        setLikerDogs(uniqDgs);
      });
    };
    getData();
  }, []);

  return (
    <div>
      <div className="w-full min-h-screen h-fit py-[50px] px-[50px] bg-lightGreen">
        <div className="flex justify-end w-full">
          {/* <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Both">Both</option>
              <option value="Sex">Sex</option>
              <option value="Walk">Walk</option>
            </select> */}

          <div>
            <button
              className={`${
                activeTab === 'All'
                  ? 'bg-accYellow text-white'
                  : 'bg-white text-black'
              } py-3 px-20 text-[30px]`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('All');
              }}>
              Мене лайкнули
            </button>
            <button
              className={`${
                activeTab === 'My'
                  ? 'bg-accYellow text-white'
                  : 'bg-white text-black'
              } py-3 px-20 text-[30px]`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('My');
              }}>
              Лайкнуті
            </button>
          </div>
        </div>
        <div className="mt-20">
          {activeTab === 'All' ? (
            likerDogs.length > 0 ? (
              <div className="flex flex-wrap gap-20 items-center justify-center">
                {likerDogs?.map((item) => (
                  <TindogLikerCard
                    key={item.id}
                    myApplication={application[0]}
                    dog={item}
                  />
                ))}
              </div>
            ) : (
              <div className="text-[64px] text-white font-bold text-center">
                Вас ще ніхто не лайкнув
              </div>
            )
          ) : likedApplication.length > 0 ? (
            <div className="flex flex-wrap gap-20 items-center justify-center">
              {likedApplication.map((item) => (
                <TindogAppCard
                  currDogId={application[0].id}
                  key={item.id}
                  application={item}
                  isLiked
                />
              ))}
            </div>
          ) : (
            <div className="text-[64px] text-white font-bold text-center">
              Ви ще нікого не лайкнули
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
