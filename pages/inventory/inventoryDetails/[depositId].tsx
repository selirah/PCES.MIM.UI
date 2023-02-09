import AppLayout from 'components/AppLayout';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import InventoryDetails from 'components/warehouse/InventoryDetails';

const Inventory: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Preview Deposit Inventory</title>
      </Head>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">
          Preview Deposit Inventory
        </div>
      </div>
      <div className="p-4">
        <InventoryDetails depositId={router.query.depositId} />
      </div>
    </>
  );
};

export default Inventory;
