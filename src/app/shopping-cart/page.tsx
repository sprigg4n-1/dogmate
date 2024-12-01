'use client';

import React, { useState } from 'react';

import { useCart } from '@/hooks/useCart';
import ShoppingCartItem from '@/components/shop/ShoppingCartItem';
import Link from 'next/link';

const ShoppingCartPage = () => {
  const { products, totalAmount, removeFromCart } = useCart();

  const [activeTab, setActiveTab] = useState(1);

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [street, setStreet] = useState('');

  const [cardType, setCardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardDate, setCardDate] = useState('');
  const [cardCode, setCardCode] = useState('');

  const onHandleClickChangeActivePage = (
    e: React.MouseEvent<HTMLButtonElement>,
    page: number
  ) => {
    e.preventDefault();

    console.log(page);

    if (page === 3 && (!country || !city || !postcode || !street)) {
      alert('Заповніть адрес');
      return;
    }

    if (page === 4 && (!cardType || !cardNumber || !cardDate || !cardCode)) {
      alert('Заповніть картку');
      return;
    }

    setActiveTab(page);
  };
  return (
    <div className="relative flex min-h-full h-fit">
      {products.length < 1 ? (
        <div className="flex flex-col justify-center items-center w-full gap-20 px-[100px]">
          <span className="text-[52px] font-semibold text-white text-center">
            Ви ще нічого не додали до кошику. Додайте продукт до кошика, щоб
            мати змогу замовити
          </span>
          <Link
            href={'/shop'}
            className="bg-accYellow px-20 py-5 text-white text-[32px] font-bold hover:bg-yellow-400 duration-300">
            Перейти до магазину
          </Link>
        </div>
      ) : (
        <>
          {activeTab === 4 ? (
            <div className="px-[100px] flex justify-center items-center">
              <span className="text-[52px] font-semibold text-white text-center">
                Ви успішно замовили продукти. Дякую вам за співпрацю з нами
              </span>
            </div>
          ) : (
            <>
              <div className="flex-1 flex flex-col py-[60px] h-full overflow-y-hidden pl-[50px] pr-[100px] gap-[20px]">
                {products.map((item) => (
                  <ShoppingCartItem key={item.id} product={item} />
                ))}
              </div>
            </>
          )}

          <div className="relative bg-accYellow h-full py-[130px] text-white w-[500px]">
            <div className="absolute flex flex-col gap-4 px-4 py-5 items-center justify-center -left-[44px] bg-accYellow top-[50px]">
              {Array.of(1, 2, 3, 4).map((item) => (
                <button
                  key={item}
                  className={`w-3 h-3 rounded-full border border-lightGray ${
                    item === activeTab ? 'bg-lightGray' : 'bg-transparent'
                  }`}></button>
              ))}
            </div>
            {activeTab === 1 ? (
              <div>
                <h2 className="text-center text-[36px] mb-[40px]">
                  Order Summary
                </h2>
                <div className="p-5 border-t-4 border-b-4 border-lightGray ">
                  <div className="flex flex-col gap-5 mb-[40px] h-[300px] overflow-y-scroll">
                    {products.map((item) => (
                      <div
                        key={item.id}
                        className="text-[20px] flex gap-[10px]">
                        <span>{item.name}:</span>
                        <span>{item.count}</span>
                      </div>
                    ))}
                  </div>

                  <span className="text-[22px] font-semibold">
                    Total price: {totalAmount.toFixed(2)}$
                  </span>
                </div>
                <button
                  onClick={(e) => onHandleClickChangeActivePage(e, 2)}
                  className="bg-darkGreen text-white text-[24px] px-10 py-4 block mx-auto mt-[40px] hover:bg-lightGreen duration-300">
                  Order
                </button>
              </div>
            ) : activeTab === 2 ? (
              <div>
                <h2 className="text-center text-[36px] mb-[40px]">
                  Order Summary
                </h2>
                <div className="p-5 border-t-4 border-b-4 border-lightGray flex flex-col gap-10">
                  <label className="flex items-center justify-between">
                    <span className="text-white text-[20px] font-semibold">
                      Country:
                    </span>
                    <input
                      type="text"
                      value={country}
                      className="w-[70%] outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                      placeholder="Country"
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-white text-[20px] font-semibold">
                      City:
                    </span>
                    <input
                      type="text"
                      value={city}
                      className="w-[70%] outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                      placeholder="City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-white text-[20px] font-semibold">
                      Postcode:
                    </span>
                    <input
                      type="text"
                      value={postcode}
                      className="w-[70%] outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                      placeholder="Postcode"
                      onChange={(e) => setPostcode(e.target.value)}
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-white text-[20px] font-semibold">
                      Street:
                    </span>
                    <input
                      type="text"
                      value={street}
                      className="w-[70%] outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                      placeholder="Street"
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </label>
                </div>
                <button
                  onClick={(e) => onHandleClickChangeActivePage(e, 3)}
                  className="bg-darkGreen text-white text-[24px] px-10 py-4 block mx-auto mt-[40px] hover:bg-lightGreen duration-300">
                  Next
                </button>
              </div>
            ) : activeTab === 3 ? (
              <div>
                <h2 className="text-center text-[36px] mb-[40px]">
                  Card Details
                </h2>
                <div className="p-5 border-t-4 border-b-4 border-lightGray flex flex-col gap-10 ">
                  <label className="flex flex-col gap-5">
                    <span className="text-white text-[20px] font-semibold">
                      Select card type:
                    </span>
                    <div className="flex justify-between">
                      <button
                        className={` text-[20px] w-[150px] py-1 ${
                          cardType === 'Visa'
                            ? 'bg-lightGreen text-white'
                            : 'bg-lightGray text-lightGreen'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setCardType('Visa');
                        }}>
                        Visa
                      </button>
                      <button
                        className={` text-[20px] w-[150px] py-1 ${
                          cardType === 'MasterCard'
                            ? 'bg-lightGreen text-white'
                            : 'bg-lightGray text-lightGreen'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setCardType('MasterCard');
                        }}>
                        MasterCard
                      </button>
                    </div>
                  </label>
                  <label className="flex items-center gap-5">
                    <span className="text-white text-[20px] font-semibold">
                      Сard Number:
                    </span>
                    <input
                      type="card"
                      value={cardNumber}
                      className="flex-1 outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                      placeholder="XXXX XXXX XXXX XXXX"
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength={19}
                    />
                  </label>

                  <div className="flex justify-between w-full">
                    <label className="flex items-center gap-5 ">
                      <span className="text-white text-[20px] font-semibold">
                        Expire date:
                      </span>
                      <input
                        type="text"
                        value={cardDate}
                        className=" text-center w-[100px] outline-lightGreen px-2 py-1 text-mainDark text-[20px]"
                        placeholder="mm/yy"
                        onChange={(e) => setCardDate(e.target.value)}
                        maxLength={5}
                      />
                    </label>
                    <label className="flex items-center gap-5 ">
                      <span className="text-white text-[20px] font-semibold">
                        CW:
                      </span>
                      <input
                        type="text"
                        value={cardCode}
                        className=" outline-lightGreen  w-[100px] px-2 py-1 text-mainDark text-[20px] text-center"
                        placeholder="XXX"
                        onChange={(e) => setCardCode(e.target.value)}
                        maxLength={3}
                      />
                    </label>
                  </div>
                </div>
                <button
                  onClick={(e) => onHandleClickChangeActivePage(e, 4)}
                  className="bg-white text-mainDark text-[24px] px-10 py-4 block mx-auto mt-[40px] hover:bg-lightGreen hover:text-white duration-300">
                  Finish
                </button>
              </div>
            ) : activeTab === 4 ? (
              <div>
                <h2 className="text-center text-[36px] mb-[40px]">
                  Успішна оплата!
                </h2>
                <p className="px-5 py-10 border-t-4 border-b-4 border-lightGray text-[20px] ">
                  Дякуємо за ваше замовлення! 🎉 Ваші товари будуть доставлені
                  найближчим часом.
                </p>
                <Link
                  href="/shop"
                  onClick={() => {
                    products.map((item) => {
                      removeFromCart(item.id);
                    });
                  }}
                  className="bg-white text-mainDark w-fit text-[24px] px-10 py-4 block mx-auto mt-[40px] hover:bg-lightGreen hover:text-white duration-300">
                  Back
                </Link>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;
