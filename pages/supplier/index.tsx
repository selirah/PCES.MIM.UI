import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable
        classifier="supplier"
        hiddenTableFields="SupplierId,CreationDate,ModificationDate,IsActive,UserId,NameLocal,DescriptionLocal,ProductSubcategoryId,Row,PhoneNumber"
      />
    </>
  );
};

export default index;
