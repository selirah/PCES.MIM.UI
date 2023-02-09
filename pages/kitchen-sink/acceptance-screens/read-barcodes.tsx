import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReadBarCodes from 'components/acceptance-screens/ReadBarCodes';

const queryClient = new QueryClient();

const ReadBarcodes: React.FC = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>ReadBarcodes</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ReadBarCodes path="/forms/read-barcodes" onSubmit={handleSubmit} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default ReadBarcodes;
