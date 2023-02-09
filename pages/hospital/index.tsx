import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable
        classifier="hospital"
        hiddenTableFields="hospitalId,cityId,centralId,nameLocal,descriptionLocal,city"
      />
    </>
  );
};

export default index;
