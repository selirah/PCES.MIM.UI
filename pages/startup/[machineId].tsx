import axios from 'axios';
import MachineSetupHistory from 'components/startup/MachineStartupHistory';
import { Params } from 'next/dist/server/router';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

const SetupHistory: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Setup History</title>
      </Head>
      <MachineSetupHistory machineId={router.query.machineId} />
    </>
  );
};
export default SetupHistory;
