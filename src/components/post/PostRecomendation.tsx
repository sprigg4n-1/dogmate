'use client';

import React, { useEffect, useState } from 'react';

import MainContainer from '../common/MainContainer';
import { UserPostProps } from '@/types/types';
import PostComponent from './PostComponent';
import { getPosts } from '@/services/SocialService';

const PostRecomendation = () => {
  const [allUserPosts, setAllUserPosts] = useState<UserPostProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const psts: UserPostProps[] = await getPosts();

      const newArr = psts.map((item: UserPostProps) => item);

      console.log(newArr);
      setAllUserPosts(newArr);
    };

    getData();
  }, []);

  return (
    <MainContainer>
      <div className="flex gap-10 py-[100px]">
        {allUserPosts.map((post) => (
          <PostComponent key={post.id} post={post} isFullView={false} />
        ))}
      </div>
    </MainContainer>
  );
};

export default PostRecomendation;
