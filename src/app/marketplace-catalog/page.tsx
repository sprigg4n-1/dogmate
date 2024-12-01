'use client';

import React, { useEffect, useState } from 'react';

import ChangeView from '@/components/ui/ChangeView';
import testPhoto from '@/public/test-applications.png';
import FullViewApplication from '@/components/marketplace/FullViewApplication';
import ApplicationCard from '@/components/account/ApplicationCard';
import { MarketplaceCategories } from '@/types/types';
import { getMarketplaceCategories } from '@/services/MarketplaceService';

const images = [
  'https://i.pinimg.com/236x/be/f0/97/bef097659b560b51e6f2a33df6178dab.jpg',
  'https://i.pinimg.com/236x/4c/6a/b4/4c6ab4418f7cf82c4225eb8671f26da2.jpg',
  'https://i.pinimg.com/474x/03/c4/ba/03c4ba58dd9b7cbde9b333c4dc4b92e8.jpg',
  'https://i.pinimg.com/236x/ee/b1/7f/eeb17f0c344b642d47b81e32fa63d1f6.jpg',
  'https://i.pinimg.com/236x/4c/6a/b4/4c6ab4418f7cf82c4225eb8671f26da2.jpg',
];

const MarketplaceCatalogPage = () => {
  const [allCategories, setAllCategories] = useState<MarketplaceCategories[]>(
    []
  );

  const [applications, setApplications] = useState([
    {
      id: 1,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 5.0,
      accName: 'Tina',
    },
    {
      id: 2,
      title: 'Cleaning',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 3.0,
      accName: 'Mike',
    },
    {
      id: 3,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 4.0,
      accName: 'Sasha',
    },
    {
      id: 4,
      title: 'Walking',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: testPhoto,
      rating: 3.3,
      accName: 'Roman',
    },
  ]);

  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [sortedBy, setSortedBy] = useState('');
  const [searchText, setSearchText] = useState('');

  const [isFullView, setIsFullView] = useState<boolean>(true);

  const onHandleClickChangeView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsFullView((isFullView) => !isFullView);
  };

  useEffect(() => {
    const getData = async () => {
      const ctgs = await getMarketplaceCategories();

      const newCtgs = ctgs.map((item: MarketplaceCategories, i: number) => {
        const newItem = item;
        newItem.photoUrl = images[i];

        return newItem;
      });

      console.log(newCtgs);

      setAllCategories(newCtgs);
    };

    getData();
  }, []);

  return (
    <div className="flex">
      <div className="flex flex-col px-[60px] bg-lightGreen items-center justify-center gap-10">
        <input
          type="text"
          className="rounded-xl w-[420px] bg-lightGray py-2 px-4 text-mainDark text-[22px]"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="py-2 px-5 text-[22px] bg-lightGray w-[350px]"
          value={activeCategory}
          onChange={(e) => setActiveCategory(+e.target.value)}>
          <option value="0">Виберіть категорію</option>
          {allCategories.map((item) => (
            <option key={item.categoryId} value={item.categoryId}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          className="py-2 px-5 text-[22px] bg-lightGray w-[350px]"
          value={sortedBy}
          onChange={(e) => setSortedBy(e.target.value)}>
          <option value="">Виберіть сортування</option>
          <option value="Popular">Low Price</option>
          <option value="High Price">High Price</option>
          <option value="Low Price">Low Price</option>
        </select>
        <ChangeView
          isFullView={isFullView}
          onHandleClickChangeView={onHandleClickChangeView}
        />
      </div>
      <div className="h-screen overflow-y-scroll flex-1 px-[100px] py-[50px]">
        <h3 className="text-[42px] font-medium text-white mb-5">
          {applications.length} продуктів
        </h3>
        {isFullView ? (
          <div className="flex flex-col items-center gap-20">
            {applications.map((item) => (
              <FullViewApplication
                key={item.id}
                id={item.id}
                photoUrl={item.photoUrl}
                title={item.title}
                description={item.description}
                rating={item.rating}
                accName={item.accName}
              />
            ))}
          </div>
        ) : (
          <div className="flex gap-20 flex-wrap items-center justify-center">
            {applications.map((item) => (
              <ApplicationCard
                id={item.id}
                photoUrl={item.photoUrl}
                title={item.title}
                description={item.description}
                rating={item.rating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceCatalogPage;
