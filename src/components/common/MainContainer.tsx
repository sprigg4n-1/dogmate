import React from 'react';

const MainContainer = ({ children }: { children: React.ReactElement }) => {
  return <div className="mx-auto max-w-[1800px] px-5">{children}</div>;
};

export default MainContainer;
