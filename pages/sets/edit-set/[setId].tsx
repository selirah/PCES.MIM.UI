import AppLayout from 'components/AppLayout';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EditSet from 'components/sets/EditSet';

const EditSetPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Edit Set</title>
      </Head>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">Update Set</div>
      </div>
      <div className="p-4">
        <EditSet setId={router.query.setId} />
      </div>
    </>
  );
};

export default EditSetPage;
