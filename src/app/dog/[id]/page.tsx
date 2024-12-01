import DogAccount from '@/components/dog/DogAccount';
import { getDogById } from '@/services/SocialService';
import React from 'react';

const DogAccPage = async ({ params }: { params: any }) => {
  const id = await params.id;

  const dog = await getDogById(id);

  return (
    <div className="flex flex-1">
      <DogAccount dog={dog} />
    </div>
  );
};

export default DogAccPage;
