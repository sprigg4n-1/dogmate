'use client';

import React, { useEffect, useState } from 'react';

import {
  getCategories,
  getCountries,
  getProducts,
} from '@/services/ShopService';

import { CategoryType, CountryType, DogProductProps } from '@/types/types';

import ShopCardItem from '@/components/shop/ShopCardItem';

const sorting = ['Popular', 'High Price', 'Low Price'];

const ShopCatalogPage = () => {
  const [allProducts, setAllProducts] = useState<DogProductProps[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<DogProductProps[]>(
    []
  );

  const [countries, setCountries] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const [isOpenFilters, setIsOpenFilters] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filterTab, setFilterTab] = useState('Type');

  const [filtTypes, setFiltTypes] = useState<string[]>([]);
  const [filtCountries, setFiltCountries] = useState<string[]>([]);
  const [sortedBy, setSortedBy] = useState('');

  useEffect(() => {
    const getData = async () => {
      const ctgs = await getCategories();
      const cnts = await getCountries();
      const prdcts = await getProducts();

      const newCtgs = ctgs.map((item: CategoryType) => item.name);
      const newCnts = cnts.map((item: CountryType) => item.name);
      const newPrdcts = prdcts.map((item: DogProductProps) => item);

      setCountries(newCnts);
      setCategories(newCtgs);
      setAllProducts(newPrdcts);
      setFilteredProducts(newPrdcts);
    };

    getData();
  }, []);

  useEffect(() => {
    if (filtTypes.length == 0 || filtCountries.length == 0) {
      setFilteredProducts(allProducts);
    }

    if (searchText) {
      const filteredArr: any = allProducts.filter((item) =>
        item.name
          .replace(/\s+/g, '')
          .toLowerCase()
          .includes(searchText.replace(/\s+/g, '').toLowerCase())
      );

      setFilteredProducts(filteredArr);
    }

    if (filtCountries.length > 0) {
      const filteredArr: any = [];

      filtCountries.forEach((country) => {
        const newItems = allProducts.filter(
          (prod) => prod.country.name.toLowerCase() == country.toLowerCase()
        );

        filteredArr.push(...newItems);
      });

      setFilteredProducts(filteredArr);
    }

    if (filtTypes.length > 0) {
      const filteredArr: any = [];

      filtTypes.forEach((type) => {
        const newItems = allProducts.filter(
          (prod) => prod.category.name.toLowerCase() == type.toLowerCase()
        );

        filteredArr.push(...newItems);
      });

      setFilteredProducts(filteredArr);
    }

    switch (sortedBy) {
      case 'Popular':
        setFilteredProducts((products) =>
          [...products].sort((a, b) => b.rating - a.rating)
        );
        break;
      case 'High Price':
        setFilteredProducts((products) =>
          [...products].sort((a, b) => b.price - a.price)
        );
        break;
      case 'Low Price':
        setFilteredProducts((products) =>
          [...products].sort((a, b) => a.price - b.price)
        );
        break;
      default:
        setFilteredProducts((products) => [...products]);
        break;
    }
  }, [sortedBy, filtTypes, filtCountries, searchText]);

  const onHandleClickChangeTypes = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    setFiltTypes((filtTypes) => {
      const isValueInArr = filtTypes.find((item) => item === value);
      if (isValueInArr) {
        return filtTypes.filter((item) => item !== value);
      }
      return [...filtTypes, value];
    });
  };

  const onHandleClickChangeCountries = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();

    setFiltCountries((filtCountries) => {
      const isValueInArr = filtCountries.find((item) => item === value);
      if (isValueInArr) {
        return filtCountries.filter((item) => item !== value);
      }
      return [...filtCountries, value];
    });
  };

  return (
    <div className="py-10 flex flex-col gap-10 w-full px-[100px]">
      <div className="bg-accYellow rounded-xl overflow-hidden w-[700px] mx-auto">
        <div className="flex">
          <input
            type="text"
            className="rounded-xl bg-lightGray py-2 px-4 text-mainDark text-[22px] w-[550px]"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="px-10 text-[22px] hover:text-white flex-1"
            onClick={(e) => {
              e.preventDefault();
              setIsOpenFilters((isOpenFilters) => !isOpenFilters);
            }}>
            filter
          </button>
        </div>
        {isOpenFilters && (
          <div className="flex py-1">
            <div className="p-5 border-r-2 border-white flex flex-col gap-5">
              <button
                className={`text-[20px] hover:text-white ${
                  filterTab === 'Type'
                    ? 'text-white scale-110'
                    : 'text-mainDark'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterTab('Type');
                }}>
                Type
              </button>
              <button
                className={`text-[20px] hover:text-white ${
                  filterTab === 'Country'
                    ? 'text-white scale-110'
                    : 'text-mainDark'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterTab('Country');
                }}>
                Country
              </button>
              <button
                className={`text-[20px] hover:text-white ${
                  filterTab === 'Sort by'
                    ? 'text-white scale-110'
                    : 'text-mainDark'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setFilterTab('Sort by');
                }}>
                Sort by
              </button>
            </div>
            <div className="flex-1 p-2">
              <div className="flex gap-5 flex-wrap items-center justify-center h-full">
                {filterTab === 'Type' ? (
                  <>
                    {categories.map((item) => (
                      <button
                        key={item}
                        onClick={(e) => onHandleClickChangeTypes(e, item)}
                        className={`text-black text-[18px] hover:text-white ${
                          filtTypes.find((item1) => item1 === item)
                            ? 'text-white font-bold'
                            : 'text-black'
                        }`}>
                        {item}
                      </button>
                    ))}
                  </>
                ) : filterTab === 'Country' ? (
                  <>
                    {countries.map((item) => (
                      <button
                        key={item}
                        onClick={(e) => onHandleClickChangeCountries(e, item)}
                        className={`text-[18px] hover:text-white ${
                          filtCountries.find((item1) => item1 === item)
                            ? 'text-white font-bold'
                            : 'text-black'
                        }`}>
                        {item}
                      </button>
                    ))}
                  </>
                ) : filterTab === 'Sort by' ? (
                  <>
                    {sorting.map((item) => (
                      <button
                        onClick={(e) => {
                          e.preventDefault();

                          if (sortedBy === item) {
                            setSortedBy('');
                          } else {
                            setSortedBy(item);
                          }
                        }}
                        key={item}
                        className={` text-[18px] hover:text-white ${
                          sortedBy === item
                            ? 'text-white font-bold'
                            : 'text-black'
                        }`}>
                        {item}
                      </button>
                    ))}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="">
        <h3 className="text-[42px] font-medium text-white mb-5">
          {filteredProducts.length} продуктів
        </h3>
        <div className="flex flex-wrap gap-20 items-center mx-auto">
          {filteredProducts.map((item) => (
            <ShopCardItem key={item.productId} prod={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCatalogPage;
