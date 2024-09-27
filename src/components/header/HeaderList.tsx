'use client';

import React, { useState } from 'react';

import { HEADER_ITEMS } from '@/config/index';
import HeaderListItem from './HeaderListItem';
import { HeaderItemProps } from '@/types/types';

const HeaderList = () => {
  const [items, setItems] = useState<HeaderItemProps[]>(HEADER_ITEMS);
  return (
    <nav className="flex items-center gap-[120px]">
      {items.map((item) => (
        <HeaderListItem {...item} key={item.title} />
      ))}
    </nav>
  );
};

export default HeaderList;
