import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable
        classifier="clinic"
        hiddenTableFields="clinicId,hospitalId,nameLocal,descriptionLocal,hospital"
      />
    </>
  );
};

export default index;
