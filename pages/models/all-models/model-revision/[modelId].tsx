import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReviewModel from 'components/models/ReviewModel';

const RevisionModelPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Model Revision</title>
      </Head>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">
          Model Revision
        </div>
      </div>
      <div className="p-4">
        <ReviewModel setModelId={router.query.modelId} />
      </div>
    </>
  );
};

export default RevisionModelPage;
