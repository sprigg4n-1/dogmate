import React from 'react';

import TindogChatSection from '@/components/tindog/TindogChatSection';
import { getDogById } from '@/services/SocialService';
import { UserDogProps } from '@/types/types';

const TindogChat = async ({ params }: { params: any }) => {
  const id = await params.id;

  const dog: UserDogProps = await getDogById(id);

  return (
    <>
      <TindogChatSection dog={dog} />
    </>
  );
};

export default TindogChat;
