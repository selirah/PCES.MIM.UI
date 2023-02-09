import AppLayout from 'components/AppLayout';
import Inventory from 'components/warehouse/Inventory';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <Inventory />
    </>
  );
};

export default index;
