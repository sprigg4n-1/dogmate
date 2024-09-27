import { HeaderItemProps } from '../types/types';

export const HEADER_ITEMS: HeaderItemProps[] = [
  { isActive: true, link: '/', title: 'Home' },
  { isActive: false, link: '/tindog', title: 'TinDog' },
  { isActive: false, link: '/chats', title: 'Message' },
  { isActive: false, link: '/posts', title: 'Posts' },
  { isActive: false, link: '/marketplace', title: 'MarketPlace' },
  { isActive: false, link: '/shop', title: 'Shop' },
];
