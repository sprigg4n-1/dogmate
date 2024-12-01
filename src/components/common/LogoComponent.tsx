import React from 'react';

import Image from 'next/image';

import logo from '@/public/svg/logo-3.svg';

const LogoComponent = ({ subtitle }: { subtitle: string }) => {
  return (
    <div className="flex items-center gap-1">
      <Image src={logo} alt="logo" className="objects-fit h-[60px] w-[60px]" />
      <div>
        <h3 className="text-mainDark font-medium text-[24px] leading-[1]">
          DogMate
        </h3>
        <span className="text-mainDark font-medium text-[14px]">
          {subtitle}
        </span>
      </div>
    </div>
  );
};

export default LogoComponent;
