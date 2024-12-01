import { HeaderItemProps } from '../types/types';

// header
export const HEADER_ITEMS_SOCIAL: HeaderItemProps[] = [
  { isActive: true, link: '/', title: 'Home' },
  { isActive: false, link: '/chats', title: 'Chats' },
  { isActive: false, link: '/tindog', title: 'TinDog' },
  { isActive: false, link: '/shop', title: 'Shop' },
  { isActive: false, link: '/marketplace', title: 'Marketplace' },
];
export const HEADER_ITEMS_TINDOG: HeaderItemProps[] = [
  { isActive: true, link: '/tindog', title: 'Home' },
  { isActive: false, link: '/', title: 'DogMate' },
  { isActive: false, link: '/shop', title: 'Shop' },
  { isActive: false, link: '/marketplace', title: 'Marketplace' },
];
export const HEADER_ITEMS_SHOP: HeaderItemProps[] = [
  { isActive: true, link: '/shop', title: 'Home' },
  { isActive: false, link: '/shop-catalog', title: 'Catalog' },
  { isActive: false, link: '/', title: 'DogMate' },
  { isActive: false, link: '/marketplace', title: 'Marketplace' },
];

export const HEADER_ITEMS_MARKETPLACE: HeaderItemProps[] = [
  { isActive: true, link: '/marketplace', title: 'Home' },
  { isActive: false, link: '/marketplace-catalog', title: 'Catalog' },
  { isActive: false, link: '/chats', title: 'Chat' },
  { isActive: false, link: '/', title: 'DogMate' },
  { isActive: false, link: '/shop', title: 'Shop' },
];

export const HEADER_ITEMS_MARKETPLACE_WORKER: HeaderItemProps[] = [
  { isActive: true, link: '/marketplace', title: 'Home' },
  { isActive: false, link: '/marketplace-catalog', title: 'Catalog' },
  { isActive: false, link: '/chats', title: 'Chat' },
];
export const HEADER_ITEMS_UNAUTHOR: HeaderItemProps[] = [
  { isActive: true, link: '/', title: 'Home' },
  { isActive: false, link: '/unauth', title: 'Chats' },
  { isActive: false, link: '/unauth', title: 'TinDog' },
  { isActive: false, link: '/unauth', title: 'Shop' },
  { isActive: false, link: '/unauth', title: 'Marketplace' },
];
