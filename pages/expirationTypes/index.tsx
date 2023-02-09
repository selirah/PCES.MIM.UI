import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import ExpitationTable from '../../components/MarijaTable/ExpirationTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <ExpitationTable
        classifier="expirationTypes"
        hiddenTableFields="ExpirationTypesId, IsActive, Actions, NameLocal, DescriptionLocal"
      />
    </>
  );
};

export default index;
