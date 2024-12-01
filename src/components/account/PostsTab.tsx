'use client';

import React, { useEffect, useState } from 'react';

import TabCard from './TabCard';
import Image from 'next/image';

import Plus from '@/public/svg/plus.svg';
import { useSession } from 'next-auth/react';
import AddPostModal from './AddPostModal';
import { getPostsByUserId } from '@/services/SocialService';
import { UserPostProps } from '@/types/types';

const PostsTab = ({ id }: { id: string }) => {
  const [allPosts, setAllPosts] = useState<UserPostProps[]>([]);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data: session } = useSession();

  const onHandleClickOpenModal = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: boolean
  ) => {
    e.preventDefault();
    setIsOpenModal(value);
  };

  useEffect(() => {
    const getData = async () => {
      const psts = await getPostsByUserId(id);

      const newPsts = psts.map((item: UserPostProps) => item);

      console.log(JSON.stringify(newPsts));

      setAllPosts(newPsts);
    };

    getData();
  }, [allPosts]);

  return (
    <div
      className={`flex flex-wrap gap-[70px] px-[45px] py-[30px] items-center ${
        allPosts.length > 0 ? '' : 'justify-center h-full'
      }`}>
      {isOpenModal && (
        <AddPostModal
          userId={id}
          setIsOpen={onHandleClickOpenModal}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
      {allPosts.map((post) => (
        <TabCard key={post.id} userId={id} isDog={false} post={post} />
      ))}
      {session?.user?.id === id ? (
        <button
          onClick={(e) => onHandleClickOpenModal(e, true)}
          className="bg-white w-[52px] h-[52px] rounded-full flex justify-center items-center hover:scale-110 duration-300">
          <Image src={Plus} alt="plus btn" width={23} height={23} />
        </button>
      ) : null}
    </div>
  );
};

export default PostsTab;
