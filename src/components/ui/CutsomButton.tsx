import React from 'react';

type ButtonProps = {
  title: string;
  onHandleClick?: () => void;
};

const CutsomButton = ({ title }: ButtonProps) => {
  return (
    <button
      className={`rounded-lg text-[26px] font-medium border-2 text-center  border-white text-white w-[270px]
       py-1 hover:bg-silver hover:border-silver hover:text-black`}>
      {title}
    </button>
  );
};

export default CutsomButton;
