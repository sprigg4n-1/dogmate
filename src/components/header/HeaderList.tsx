'use client';

import React, { useEffect, useState } from 'react';

import { usePathname } from 'next/navigation';

import {
  HEADER_ITEMS_SOCIAL,
  HEADER_ITEMS_MARKETPLACE,
  HEADER_ITEMS_SHOP,
  HEADER_ITEMS_TINDOG,
  HEADER_ITEMS_MARKETPLACE_WORKER,
  HEADER_ITEMS_UNAUTHOR,
} from '@/config/index';
import HeaderListItem from './HeaderListItem';
import { HeaderItemProps } from '@/types/types';
import { useSession } from 'next-auth/react';

const HeaderList = () => {
  const { data: session, status } = useSession();
  const [items, setItems] = useState<HeaderItemProps[]>(HEADER_ITEMS_SOCIAL);

  const pathname = usePathname();

  useEffect(() => {
    if (session?.user.role === 'worker') {
      setItems(HEADER_ITEMS_MARKETPLACE_WORKER);
    } else if (status == 'unauthenticated') {
      setItems(HEADER_ITEMS_UNAUTHOR);
    } else {
      switch (pathname) {
        case '/tindog':
          setItems(HEADER_ITEMS_TINDOG);
          break;
        case '/marketplace':
          setItems(HEADER_ITEMS_MARKETPLACE);
          break;
        case '/shop':
          setItems(HEADER_ITEMS_SHOP);
          break;
        case '/':
          setItems(HEADER_ITEMS_SOCIAL);
          break;
      }
    }
  }, [pathname]);

  useEffect(() => {
    console.log(pathname);
    setItems((items) => {
      const newItems = [...items];

      newItems.map((item) => {
        item.isActive = false;

        if (item.link === pathname) {
          item.isActive = true;
        }
      });

      return [...newItems];
    });

    console.log(items);
  }, [pathname]);

  return (
    <nav className="flex items-center gap-[100px]">
      {items.map((item) => (
        <HeaderListItem {...item} key={item.title} />
      ))}
    </nav>
  );
};

export default HeaderList;
