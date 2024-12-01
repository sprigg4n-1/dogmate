import FullViewComponent from '@/components/post/FullViewComponent';
import PostRecomendation from '@/components/post/PostRecomendation';
import { getPostById } from '@/services/SocialService';

const PostPage = async ({ params }: { params: any }) => {
  const id = await params.id;

  const post = await getPostById(id);

  return (
    <>
      <FullViewComponent post={post} />
      <PostRecomendation />
    </>
  );
};

export default PostPage;
