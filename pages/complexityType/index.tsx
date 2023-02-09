import AppLayout from 'components/AppLayout';
import ComplexityTypeTable from 'components/MarijaTable/ComplexityTypeTable';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';


const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <ComplexityTypeTable
        classifier="complexityType"
        hiddenTableFields="complexityTypeId, creationDate, modificationDate, isActive, userId, pricing, pricingId, validFrom, validTo, nameLocal, descriptionLocal"
      />
    </>
  );
};

export default index;
