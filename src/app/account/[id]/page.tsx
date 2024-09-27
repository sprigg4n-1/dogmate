'use client';

import Image from 'next/image';

import AccPhoto from '@/public/test-account/acc-photo.png';
import CutsomButton from '@/components/ui/CutsomButton';
import { EventHandler, useState } from 'react';
import DogsTab from '@/components/account/DogsTab';
import PostsTab from '@/components/account/PostsTab';
import SettingsTab from '@/components/account/SettingsTab';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('dogs');

  const onHandleChangeTab = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    if (value !== activeTab) {
      setActiveTab(value);
    }
  };

  return (
    // bg-gradient-to-tl from-vegetation to-punchOutGlove
    <div className="flex flex-1 bg-gradient-to-l from-vegetation to-punchOutGlove ">
      <div className="bg-[#E2EFFF]">
        <div className="flex items-center text-white gap-[30px] pt-[22px] px-[30px] mb-[140px]">
          <Image
            src={AccPhoto}
            alt="account photo"
            className="w-[158px] h-[158px] object-fit rounded-full border-2 border-white drop-shadow-account"
          />
          <div className="flex flex-col gap-3 text-black">
            <h3 className="text-[24px] font-medium">Yukki</h3>
            <span className="text-[20px] tracking-widest">
              Markelova Valeria
            </span>
          </div>
        </div>

        <ul className=" flex flex-col gap-[36px] flex-end pt-5">
          <li className="pl-[75px] text-center">
            <button
              className={`uppercase w-full py-3 rounded-tl-full rounded-bl-full text-[26px] font-medium tracking-widest px-[30px]  ${
                activeTab == 'dogs'
                  ? 'bg-gradient-to-r from-[#0E4C97] to-[#6C9BDB] text-white text-left'
                  : 'text-phthaloBlue bg-transparent text-right'
              }`}
              onClick={(e) => onHandleChangeTab(e, 'dogs')}>
              dogs
            </button>
          </li>
          <li className="pl-[75px] text-center">
            <button
              className={`uppercase w-full py-3 rounded-tl-full rounded-bl-full  text-[26px] font-medium tracking-widest px-[30px] ${
                activeTab == 'posts'
                  ? 'bg-gradient-to-r from-[#0E4C97] to-[#6C9BDB] text-white text-left'
                  : 'text-phthaloBlue bg-transparent text-right'
              }`}
              onClick={(e) => onHandleChangeTab(e, 'posts')}>
              posts
            </button>
          </li>
          <li className="pl-[75px] text-center">
            <button
              className={`uppercase w-full py-3 rounded-tl-full rounded-bl-full text-[26px] font-medium tracking-widest px-[30px] ${
                activeTab == 'settings'
                  ? 'bg-gradient-to-r from-[#0E4C97] to-[#6C9BDB] text-white text-left'
                  : 'text-phthaloBlue  text-right'
              }`}
              onClick={(e) => onHandleChangeTab(e, 'settings')}>
              settings
            </button>
          </li>
        </ul>
      </div>

      <div className="flex-1">
        <div className="flex bg-astronaut bg-opacity-70 pb-[56px] pt-[29px] px-[120px] gap-[225px]">
          <ul className="flex flex-1 justify-between">
            {['Followers', 'Following', 'Posts'].map((item) => (
              <li className="flex flex-col items-center gap-[15px]" key={item}>
                <span className="text-white font-medium text-[48px]">1</span>
                <CutsomButton title={item} />
              </li>
            ))}
          </ul>
        </div>
        <div className="px-[58px] pt-[40px] pb-[20px] flex-1">
          {activeTab === 'dogs' ? (
            <DogsTab />
          ) : activeTab === 'posts' ? (
            <PostsTab />
          ) : (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
