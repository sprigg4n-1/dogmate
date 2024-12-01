'use client';

import React, { useState } from 'react';
import WorkerSide from './WorkerSide';
import SettingsTab from './SettingsTab';
import DashboardTab from './DashboardTab';
import ApplicationsTab from './ApplicationsTab';

const WorkerAccount = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState('applications');

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
      <WorkerSide
        activeTab={activeTab}
        onHandleChangeTab={onHandleChangeTab}
        id={id}
      />
      <div className="flex-1">
        {activeTab === 'dashboard' ? (
          <DashboardTab id={id} />
        ) : activeTab === 'applications' ? (
          <ApplicationsTab id={id} />
        ) : (
          <SettingsTab />
        )}
      </div>
    </>
  );
};

export default WorkerAccount;
