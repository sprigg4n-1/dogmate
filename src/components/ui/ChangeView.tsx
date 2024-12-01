import React from 'react';

const ChangeView = ({
  isFullView,
  onHandleClickChangeView,
}: {
  isFullView: boolean;
  onHandleClickChangeView: (e: any) => void;
}) => {
  return (
    <button
      className="relative h-fit bg-mainDark rounded-full cursor-pointer"
      onClick={(e) => onHandleClickChangeView(e)}>
      <div
        className={`absolute w-[31px] h-[31px] rounded-full bg-lightGray z-10 top-1/2 -translate-y-1/2  ${
          isFullView ? 'left-[6px]' : 'right-[6px]'
        }`}></div>
      <div className="w-[100px] h-[40px] px-[13px] py-1 flex items-center justify-between">
        <div
          className={`relative w-[17px] h-[17px]  z-20 ${
            isFullView ? 'bg-mainDark' : 'bg-lightGray'
          }`}></div>
        <div className="w-[17px] h-[17px] flex justify-around flex-wrap">
          <div
            className={`relative w-[7px] h-[7px] bg-lightGray z-20 ${
              !isFullView ? 'bg-mainDark' : 'bg-lightGray'
            }`}></div>
          <div
            className={`relative w-[7px] h-[7px] bg-lightGray z-20 ${
              !isFullView ? 'bg-mainDark' : 'bg-lightGray'
            }`}></div>
          <div
            className={`relative w-[7px] h-[7px] bg-lightGray z-20 ${
              !isFullView ? 'bg-mainDark' : 'bg-lightGray'
            }`}></div>
          <div
            className={`relative w-[7px] h-[7px] bg-lightGray z-20 ${
              !isFullView ? 'bg-mainDark' : 'bg-lightGray'
            }`}></div>
        </div>
      </div>
    </button>
  );
};

export default ChangeView;
