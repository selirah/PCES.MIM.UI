import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable classifier="property" hiddenTableFields="propertyId,nameLocal,descriptionLocal,isActive" />
    </>
  );
};

export default index;
