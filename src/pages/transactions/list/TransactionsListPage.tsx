import PaymentList from '@ui/templates/transactions/PaymentList';
import PageLayout from '@ui/layouts/PageLayout';

const TransactionsListPage = () => {
  return (
    <PageLayout hasNav className='px-0'>
      <PaymentList />
    </PageLayout>
  );
};

export default TransactionsListPage;
