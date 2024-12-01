import AccountContent from '@/components/account/AccountContent';

const AccountPage = async ({ params }: { params: any }) => {
  const id = await params.id;

  return (
    <div className="flex flex-1">
      <AccountContent id={id} />
    </div>
  );
};

export default AccountPage;
