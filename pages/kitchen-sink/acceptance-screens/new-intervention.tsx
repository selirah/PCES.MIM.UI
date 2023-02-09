import React from 'react';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// import NewInterventionForm from 'components/warehouse/NewInterventionForm/NewInterventionForm';

const queryClient = new QueryClient();

const NewIntervention: React.FC = () => {
  // function handleSubmit(data: any) {
  //   console.log(data);
  // }
  return (
    <>
      <Head>
        <title>New Acceptance Screen</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        {/* <NewInterventionForm
          path="acceptance"
          onSubmit={handleSubmit}
        /> */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default NewIntervention;
