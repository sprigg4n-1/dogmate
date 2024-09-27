import React from 'react';
import HeaderList from './HeaderList';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="flex justify-between items-center bg-white">
      <h2 className="pl-[62px] font-medium text-[32px] text-black">DogMate</h2>
      <HeaderList />
      <Link
        className="bg-kittenEye px-[62px] pt-2 pb-4 text-[24px] text-center text-white hover:text-astronaut duration-300"
        href="/account/1">
        Yukki
      </Link>
    </header>
  );
};

export default Header;
