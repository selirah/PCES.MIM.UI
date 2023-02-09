import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable
        classifier="machineType"
        hiddenTableFields="machineTypeId,creationDate,modificationDate,userId,isActive,nameLocal,descriptionLocal,machines,user"
      />
    </>
  );
};

export default index;
