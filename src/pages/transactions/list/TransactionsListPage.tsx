import PaymentList from '@ui/templates/transactions/PaymentList';
import PageLayout from '@ui/layouts/PageLayout';

const TransactionsListPage = () => {
  return (
    <PageLayout hasNav>
      <PaymentList />
    </PageLayout>
  );
};

export default TransactionsListPage;
