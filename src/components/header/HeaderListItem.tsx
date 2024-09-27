import { HeaderItemProps } from '@/types/types';
import Link from 'next/link';

const HeaderListItem = ({ title, link, isActive }: HeaderItemProps) => {
  return (
    <Link
      className={`text-2xl text-black border-b-2 border-transparent pb-1 hover:text-poolBlue duration-200 ${
        isActive ? 'border-silver' : ''
      }`}
      href={link}>
      {title}
    </Link>
  );
};

export default HeaderListItem;
