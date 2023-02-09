import AppLayout from 'components/AppLayout';
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PreviewSet from 'components/sets/PreviewSet';
import PreviewModel from 'components/models/PreviewModel';

const PreviewSetPage: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Preview Set</title>
      </Head>
      <div className="screen-background">
      <div className="border-b-2 border-blue-700 h-12">
        <div className=" font-play font-semibold text-left ml-12 mt-4 text-gradient">
          PREVIEW SET
        </div>
      </div>
      <div className="p-4">
        <PreviewSet setId={router.query.setId} />
      </div>
      </div>
    </>
  );
};

export default PreviewSetPage;
