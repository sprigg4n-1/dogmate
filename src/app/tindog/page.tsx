'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { TinDogApplication, UserDogProps } from '@/types/types';
import BestApplication from '@/components/tindog/BestApplication';
import ButtonBestApplication from '@/components/tindog/ButtonBestApplication';
import TindogAppCard from '@/components/tindog/TindogAppCard';
import { getApplications } from '@/services/TindogService';
import { getDogsByUserId } from '@/services/SocialService';
import { useSession } from 'next-auth/react';
import deleteIcon from '@/public/svg/close.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useDogContext } from '@/config/DogPrivider';

const TindogPage = () => {
  const { data: session } = useSession();

  const { currDog, setCurrDog } = useDogContext();

  const [allMyDogs, setAllMyDogs] = useState<UserDogProps[]>([]);

  const [applications, setApplications] = useState<TinDogApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<
    TinDogApplication[]
  >([]);

  const [activeBest, setActiveBest] = useState<number>(0);
  const [activeBestDog, setActiveBestDog] = useState<TinDogApplication>();

  const [bestApplications, setBestApplications] = useState<TinDogApplication[]>(
    []
  );

  const [filterType, setFilterType] = useState('All');

  const onHandleClickChangeAcitve = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: number
  ) => {
    e.preventDefault();
    setActiveBest(value);
  };

  const onHandleClickSetDog = (dog: UserDogProps) => {
    setCurrDog(dog);
  };

  useEffect(() => {
    const getData = async () => {
      const apls = await getApplications();
      const dgs = await getDogsByUserId(session?.user.id || '');

      const newApls = apls.map((item: TinDogApplication) => item);
      const newDgs = dgs.map((item: UserDogProps) => item);

      setAllMyDogs(newDgs);

      setApplications(newApls);
      setBestApplications(
        newApls.slice(0, newApls.length > 3 ? 3 : newApls.length)
      );
      setActiveBest(newApls.length > 0 ? newApls[0].id : null);
      setActiveBestDog(newApls[0]);
      setFilteredApplications(newApls);
    };
    getData();
  }, []);

  useEffect(() => {
    const newBest = bestApplications.filter((item) => item.id == activeBest)[0];

    setActiveBestDog(newBest);
  }, [activeBest]);

  return (
    <>
      {currDog ? (
        <div>
          <div className="flex justify-between w-full px-[100px] py-20">
            <Link
              className="px-10 py-3 bg-white text-mainDark text-[22px] font-medium hover:bg-accYellow hover:text-white"
              href={`/tindog-chat/${currDog?.id}`}>
              Перейти до чатування
            </Link>
            <Link
              href={`/dog/${currDog.id}`}
              className="text-[35px] text-accYellow font-bold italic">
              {currDog?.name}
            </Link>
            <Link
              className="px-10 py-3 bg-white text-mainDark text-[22px] font-medium hover:bg-accYellow hover:text-white"
              href={`/tindog-notification/${currDog?.id}`}>
              Перейти до спопіщень
            </Link>
          </div>
          {bestApplications && (
            <div className=" pb-[100px] flex">
              <div className="border-mainBlack border flex flex-col h-full justify-between">
                {bestApplications.map((item) => (
                  <ButtonBestApplication
                    key={item.id}
                    application={item}
                    activeItem={activeBest}
                    setActiveItem={onHandleClickChangeAcitve}
                  />
                ))}
              </div>
              <BestApplication
                currDogId={currDog?.id || 0}
                application={activeBestDog}
              />
            </div>
          )}

          <div className="px-[150px] py-[50px]">
            <div className="border-b-2 border-white flex justify-between">
              <button
                className={`w-1/4 text-center py-2 text-[32px] ${
                  filterType === 'All'
                    ? 'bg-white text-accYellow '
                    : 'bg-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType('All');
                }}>
                Всі
              </button>
              <button
                className={`w-1/4 text-center py-2 text-[36px] ${
                  filterType === 'Walk'
                    ? 'bg-white text-accYellow '
                    : 'bg-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType('Walk');
                }}>
                Прогулянка
              </button>
              <button
                className={`w-1/4 text-center py-2 text-[36px] ${
                  filterType === 'Sex'
                    ? 'bg-white text-accYellow '
                    : 'bg-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType('Sex');
                }}>
                Зведення
              </button>
              <button
                className={`w-1/4 text-center py-2 text-[36px] ${
                  filterType === 'My'
                    ? 'bg-white text-accYellow '
                    : 'bg-transparent text-white'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterType('My');
                }}>
                Мої
              </button>
            </div>
            <div className="flex flex-wrap mt-[50px] justify-between gap-20">
              {filteredApplications.map((item) => (
                <TindogAppCard
                  currDogId={currDog?.id || 0}
                  key={item.id}
                  application={item}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute z-20 w-full min-h-screen bg-darkGreen bg-opacity-90 flex justify-center items-center py-[100px]">
          <Link
            href={`/account/${session?.user.id}`}
            className="absolute top-10 right-10 w-[50px] h-[50px] justify-center items-center rounded-full flex hover:scale-110 duration-300">
            <Image src={deleteIcon} width={35} height={35} alt="delete" />
          </Link>
          {allMyDogs.length > 0 ? (
            <div className="rounded w-full px-[150px] h-fit">
              <h2 className="text-[48px] font-medium text-white mb-20">
                Виберіть собаку
              </h2>
              <div className="flex flex-wrap gap-20">
                {allMyDogs.map((item) => (
                  <div key={item.id}>
                    <Image
                      onClick={() => onHandleClickSetDog(item)}
                      src={item.photoPath}
                      alt="dog`s photo"
                      width={400}
                      height={425}
                      className="w-[400px] h-[425px] object-fit rounded-md hover:scale-110 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-white w-1/2 flex flex-col gap-20 h-fit text-center items-center">
              <h2 className="text-[48px] font-medium">
                Створіть, будь ласка, акаунт собаки
              </h2>
              <p className="text-[22px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
                accusantium similique debitis nulla at aperiam molestias culpa
                soluta ipsam? Exercitationem odit iure accusantium porro non
                tenetur nostrum quas magni sapiente.
              </p>
              <Link
                href={`/dog/create`}
                className="py-2 px-20 bg-accYellow text-white text-[28px] w-fit hover:text-mainBlack hover:bg-white">
                Створити
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TindogPage;
