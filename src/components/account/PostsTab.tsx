'use client';

import React, { useState } from 'react';

import TabCard from './TabCard';
import Image from 'next/image';

import Dog1 from '@/public/test-account/dog2.png';
import Plus from '@/public/test-account/plus.svg';

const PostsTab = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Nord',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam massa erat, faucibus...',
      photoUrl: Dog1,
    },
  ]);

  return (
    <div className="flex gap-[100px] items-center">
      {posts.map((post) => (
        <TabCard key={post.id} {...post} />
      ))}
      <button className="bg-white w-[85px] h-[85px] rounded-full flex justify-center items-center hover:bg-astronaut">
        <Image src={Plus} alt="plus btn" width={37} height={37} />
      </button>
    </div>
  );
};

export default PostsTab;
