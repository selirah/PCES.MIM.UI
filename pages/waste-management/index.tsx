import React from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import WasteManagementLogs from 'components/WasteManagement/WasteManagementLogs';

const WasteLogs: React.FC = () => {
  return (
    <>
      <Head>
        <title>Waste Management Logs</title>
      </Head>
      <WasteManagementLogs />
    </>
  );
};

export default WasteLogs;
