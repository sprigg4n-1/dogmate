'use client';

import { useEffect, useState } from 'react';

import { TypeAnimation } from 'react-type-animation';

import MainContainer from '@/components/common/MainContainer';
import PostComponent from '@/components/post/PostComponent';

import { UserPostProps } from '@/types/types';

import Plus from '@/public/svg/plus-2.svg';
import Image from 'next/image';
import ChangeView from '@/components/ui/ChangeView';
import { useSession } from 'next-auth/react';
import { getPosts } from '@/services/SocialService';

const QUETES = [
  'У тебе є вороги? Добре. Значить, у своєму житті ти щось колись відстоював.',
  'Ораторське мистецтво немислиме, якщо оратор не опанував досконало предмет, про який хоче говорити.',
  'Впади сім разів, піднімися вісім',
  'У спілкуванні найважливіше – чути те, що не сказано.',
  'Або ви керуєте вашим днем, або день управляє вами.',
  'Всі діти - художники. Проблема в тому, щоб залишитися художником, коли стаєш дорослим.',
  'Побороти дурні звички легше сьогодні, ніж завтра',
  'Без здоров’я неможливо і щастя.',
  'Хто розраховує забезпечити собі здоров’я, перебуваючи в ліні, той чинить так само безглуздо, як і людина, думаючий мовчанням удосконалити свій голос.',
  'Вмирає тільки кволе і слабке, здорове і сильне завжди виходить переможцем у боротьбі за існування.',
];

export default function Home() {
  const [allUserPosts, setAllUserPosts] = useState<UserPostProps[]>([]);

  const [isFullView, setIsFullView] = useState<boolean>(true);
  const [shareNext, setShareNext] = useState<boolean>(false);

  const { data: session, status } = useSession();

  const RANDOM_QUETES = QUETES[Math.floor(Math.random() * QUETES.length)];

  const onHandleClickChangeView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFullView((isFullView) => !isFullView);
  };

  const onHandleClickChangeSchare = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    setShareNext((shareNext) => !shareNext);
  };

  useEffect(() => {
    const getData = async () => {
      const psts: UserPostProps[] = await getPosts();

      const newArr = psts.map((item: UserPostProps) => item);

      console.log(newArr);
      setAllUserPosts(newArr);
    };

    getData();
  }, []);

  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     setTimeout(() => {
  //       alert(
  //         'Ви не зайшли, зайдіть, будь ласка, щоб отримати весь функціонал продукту'
  //       );
  //     }, 30000);
  //   }
  // });

  return (
    <>
      <div className="bg-lightGreen">
        <MainContainer>
          {shareNext ? (
            <div className="py-[60px] flex justify-center">
              <div className="flex h-[550px] w-[1400px]">
                <button className="flex justify-center items-center bg-accYellow w-[400px] hover:opacity-85 duration-300">
                  <Image src={Plus} alt="plus" />
                </button>
                <div className="flex-1 text-center py-[40px] px-[50px] bg-darkGreen flex flex-col">
                  <h2 className="text-[64px] font-medium text-white tracking-wider mb-[40px]">
                    Ділись своїми спогадами!
                  </h2>
                  <div className="flex flex-col bg-lightGray border-4 rounded-lg border-accYellow py-5 px-5 text-mainDark text-[30px] h-[275px]">
                    <p>
                      {RANDOM_QUETES.length > 150
                        ? `${RANDOM_QUETES.slice(0, 150)}...`
                        : RANDOM_QUETES}
                    </p>
                    <p className="mt-auto text-right italic">- Приказка</p>
                  </div>
                  <button
                    className="block text-right mt-auto text-[24px] text-lightGray"
                    onClick={(e) => onHandleClickChangeSchare(e)}>
                    confirmation of creation
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-[60px] flex justify-between items-center">
              <TypeAnimation
                className="text-[64px] font-medium text-white tracking-wider"
                sequence={[
                  'Щасливі миті з вашим другом',
                  1500,
                  'Покажіть свою собаку в дії!',
                  1500,
                  'Ділись своїми спогадами!',
                  2500,
                ]}
                repeat={Infinity}
                cursor
              />
              <button
                onClick={(e) => onHandleClickChangeSchare(e)}
                className="block h-fit px-20 py-3 bg-accYellow rounded-xl text-xl border-4 border-transparent text-white font-bold hover:border-accYellow hover:bg-transparent">
                Share
              </button>
            </div>
          )}
        </MainContainer>
      </div>

      <div>
        <div className="bg-lightGray">
          <MainContainer>
            <div className="flex justify-between items-center py-5">
              <div className="flex gap-6">
                <button className="text-[18px] text-mainDark">
                  Subscribers
                </button>
                <button className="text-[18px] text-mainDark">
                  Recommendations
                </button>
              </div>

              <input
                type="text"
                placeholder="Search..."
                className="text-[18px] border-2 border-mainDark px-3 py-1 text-mainDark w-[640px] rounded-lg placeholder:text-mainDark"
              />

              <ChangeView
                isFullView={isFullView}
                onHandleClickChangeView={onHandleClickChangeView}
              />
            </div>
          </MainContainer>
        </div>
        <MainContainer>
          <div
            className={`flex items-center my-[100px] ${
              isFullView
                ? 'flex-col gap-[100px]'
                : 'flex-row flex-wrap gap-[100px] justify-center'
            }`}>
            {allUserPosts.map((post) => (
              <PostComponent
                post={post}
                isFullView={isFullView}
                key={post.photoPath}
              />
            ))}
          </div>
        </MainContainer>
      </div>
    </>
  );
}
