import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PricingTable from '../../components/MarijaTable/PricingTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <PricingTable
        classifier="pricing"
        hiddenTableFields="PricingId, IsActive, Actions, NameLocal, DescriptionLocal"
      />
    </>
  );
};

export default index;
