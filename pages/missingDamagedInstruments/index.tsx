import AppLayout from 'components/AppLayout';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MissingDamagedInstrumentsTable from '../../components/MarijaTable/MissingDamagedInstrumentsTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <Head><title>Missing Or Damaged Instruments</title></Head>
      <MissingDamagedInstrumentsTable
        classifier="missingDamagedInstruments"
        hiddenTableFields="MissingInsturmentId, InstrumentId, SetId, ProcessId "
      />
    </>
  );
};

export default index;
