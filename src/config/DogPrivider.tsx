'use client';

import { UserDogProps } from '@/types/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DogContextType {
  currDog: UserDogProps | null;
  setCurrDog: React.Dispatch<React.SetStateAction<UserDogProps | null>>;
}

export const DogContext = createContext<DogContextType | undefined>(undefined);

export const DogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currDog, setCurrDog] = useState<UserDogProps | null>(null);

  return (
    <DogContext.Provider value={{ currDog, setCurrDog }}>
      {children}
    </DogContext.Provider>
  );
};

export const useDogContext = (): DogContextType => {
  const context = useContext(DogContext);
  if (!context) {
    throw new Error('useDogContext must be used within a DogProvider');
  }
  return context;
};
