import React from 'react';
import { ScaleLoader } from 'react-spinners';

const DashboardTab = ({ id }: { id: string }) => {
  return (
    <div className="px-[50px] py-[25px] flex flex-col justify-center items-center gap-20">
      <h1 className="text-[64px] uppercase text-center font-bold tracking-widest text-white">
        statistics
      </h1>
      <div>
        <ScaleLoader
          loading
          color="white"
          width={25}
          height={250}
          radius={50}
        />
      </div>
      <span className="text-[22px] text-lightGray font-light">
        Comming soon...
      </span>
    </div>
  );
};

export default DashboardTab;
