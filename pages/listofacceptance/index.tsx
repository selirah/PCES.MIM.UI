import AppLayout from 'components/AppLayout';
import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import MachineMaintenanceList from 'components/machines/MachineMaintenanceList';
import AcceptanceList from 'components/acceptance-screens/AcceptanceList';
// import { ReactQueryDevtools } from 'react-query/devtools'

const AllModels: React.FC = () => {
  // const queryClient = new QueryClient()

  return (
    <>
      <Head>
        <title>List of Acceptance</title>
      </Head>
      <div className="w-full flex flex-col px-4  font-play">
        <div className="w-full flex flex-col mt-2">
          <h4 className="text-lg font-bold">List of Acceptance</h4>
        </div>
      </div>

      <div className="w-full  py-4 px-4">
        <AcceptanceList />
      </div>
    </>
  );
};

export default AllModels;