import AppLayout from 'components/AppLayout';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PreviewModel from 'components/models/PreviewModel';

const PreviewModelPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Preview Model</title>
      </Head>
      <div className="screen-background">
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4 text-gradient">
          Preview Model
        </div>
      </div>
      <div className="p-4">
        <PreviewModel setModelId={router.query.modelId} />
      </div>
      </div>
    </>
  );
};

export default PreviewModelPage;
