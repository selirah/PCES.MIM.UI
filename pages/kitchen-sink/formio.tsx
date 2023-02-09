import React from 'react';
import Head from 'next/head';
import FormIOExample from 'components/formio-example';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const FormIO: React.FC = () => {
  function handleSubmit(data: any) {
    console.log(data);
  }
  return (
    <>
      <Head>
        <title>FormIO Example</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <FormIOExample path="/example" onSubmit={handleSubmit} />
      </QueryClientProvider>
    </>
  );
};

export default FormIO;
