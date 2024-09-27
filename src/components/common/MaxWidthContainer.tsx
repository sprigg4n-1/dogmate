import React from 'react';

const MaxWidthContainer = ({ children }: { children: React.ReactElement }) => {
  return <div className="mx-auto max-w-[1480px] pl-[230px]">{children}</div>;
};

export default MaxWidthContainer;
