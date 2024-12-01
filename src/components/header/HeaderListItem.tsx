import { HeaderItemProps } from '@/types/types';
import Link from 'next/link';

const HeaderListItem = ({ title, link, isActive }: HeaderItemProps) => {
  return (
    <Link
      className={`text-[19px] border-b-2  pb-1 hover:border-b-1 hover:border-black duration-200 ${
        isActive ? 'border-black ' : 'border-transparent '
      }`}
      href={link}>
      {title}
    </Link>
  );
};

export default HeaderListItem;
