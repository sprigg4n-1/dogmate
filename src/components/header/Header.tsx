'use client';

import HeaderList from './HeaderList';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import MainContainer from '../common/MainContainer';
import LogoComponent from '../common/LogoComponent';
import { useEffect, useState } from 'react';

const Header = () => {
  const { data: session } = useSession();
  const path = usePathname();
  const [logoSub, setLogoSub] = useState('for social network');

  useEffect(() => {
    if (session?.user.role === 'worker') {
      setLogoSub('for marketplace');
    } else {
      switch (path) {
        case '/':
          setLogoSub('for social network');
          break;
        case '/shop':
          setLogoSub('for shop');
          break;
        case '/marketplace':
          setLogoSub('for marketplace');
          break;
        case '/tindog':
          setLogoSub('for tindog');
          break;
        default:
          break;
      }
    }
  }, [path]);

  return (
    <header
      className={`bg-lightGray relative z-10 ${
        path === '/auth' ? 'hidden' : ''
      }`}>
      <MainContainer>
        <div className="flex justify-between items-center h-[70px] text-black">
          <LogoComponent subtitle={logoSub} />
          <HeaderList />
          {!session ? (
            <Link
              className="text-2xl hover:border-b-2 hover:border-black border-b-2 border-transparent pb-1"
              href="/auth">
              Log in
            </Link>
          ) : logoSub === 'for shop' ? (
            <div className="flex gap-2">
              <Link
                className="text-2xl hover:border-b-2 hover:border-black border-b-2 border-transparent pb-1"
                href={`/shopping-cart`}>
                ShoppingCart
              </Link>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link
                className="text-2xl hover:border-b-2 hover:border-black border-b-2 border-transparent pb-1"
                href={`/account/${session?.user?.id}`}>
                {session?.user?.nickname || session?.user?.name}
              </Link>
            </div>
          )}
        </div>
      </MainContainer>
    </header>
  );
};

export default Header;
