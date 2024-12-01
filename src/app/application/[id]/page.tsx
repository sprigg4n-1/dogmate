import React from 'react';

import ApplicationSectionPage from '@/components/marketplace/ApplicationSectionPage';

const ApplicationPage = async ({ params }: { params: any }) => {
  const id = await params.id;

  console.log(id);

  return (
    <>
      <ApplicationSectionPage id={id} />
    </>
  );
};

export default ApplicationPage;
