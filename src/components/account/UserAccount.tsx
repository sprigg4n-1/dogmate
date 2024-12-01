'use client';

import React, { useState } from 'react';
import AccountSide from './AccountSide';
import DogsTab from './DogsTab';
import PostsTab from './PostsTab';
import SettingsTab from './SettingsTab';

const UserAccount = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState('posts');

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
    <>
      <AccountSide
        activeTab={activeTab}
        onHandleChangeTab={onHandleChangeTab}
        id={id}
      />
      <div className="flex-1">
        {activeTab === 'dogs' ? (
          <DogsTab id={id} />
        ) : activeTab === 'posts' ? (
          <PostsTab id={id} />
        ) : (
          <SettingsTab />
        )}
      </div>
    </>
  );
};

export default UserAccount;
