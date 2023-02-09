import AppLayout from 'components/AppLayout';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EditModel from 'components/models/EditModel';

const EditModelPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Duplicate Model</title>
      </Head>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">
          Duplicate Model
        </div>
      </div>
      <div className="p-4">
        <EditModel setModelId={router.query.modelId} />
      </div>
    </>
  );
};

export default EditModelPage;
