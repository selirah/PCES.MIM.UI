import AppLayout from 'components/AppLayout';
import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import MachineMaintenanceHistory from 'components/machines/MachineMaintenanceHistory';

const MaintenanceHistory: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Maintenance History</title>
      </Head>
      <MachineMaintenanceHistory machineId={router.query.machineId} />
    </>
  );
};

export default MaintenanceHistory;
