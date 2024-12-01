'use client';
import React, { useState } from 'react';
import { UserDogProps } from '@/types/types';
import DogSideAcc from './DogSideAcc';
import DogInfos from './DogInfos';
import DogApplications from './DogApplications';
import DogSettings from './DogSettings';

const DogAccount = ({ dog }: { dog: UserDogProps }) => {
  const [activeTab, setActiveTab] = useState('information');

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
    <div className="flex w-full">
      <DogSideAcc
        dog={dog}
        activeTab={activeTab}
        onHandleChangeTab={onHandleChangeTab}
      />
      <div className="flex-1 w-full">
        {activeTab === 'information' ? (
          <DogInfos dog={dog} />
        ) : activeTab === 'application' ? (
          <DogApplications userId={dog.userId} dog={dog} />
        ) : (
          <DogSettings dog={dog} />
        )}
      </div>
    </div>
  );
};

export default DogAccount;
