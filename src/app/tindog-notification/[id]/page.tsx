import { getApplicationsByDogId } from '@/services/TindogService';
import NotificationSection from '@/components/tindog/NotificationSection';

const TindogNotification = async ({ params }: { params: any }) => {
  const id = await params.id;

  const application = await getApplicationsByDogId(id);
  return (
    <>
      <NotificationSection application={application} />
    </>
  );
};

export default TindogNotification;
