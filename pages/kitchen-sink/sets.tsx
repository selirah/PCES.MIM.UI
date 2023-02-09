import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SetsForm from 'components/acceptance-screens/Sets';

const queryClient = new QueryClient();

const Sets: React.FC = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>ReadBarcodes</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <SetsForm path="sets" onSubmit={handleSubmit} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default Sets;
