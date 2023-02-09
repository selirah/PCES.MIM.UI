import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ReviewProductType from 'components/product-types/ReviewProductType';

const ProductTypeRevision: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Review Product Type </title>
      </Head>
      <div className="screen-background h-full">
        <div className="border-b-2 border-blue-700 h-12">
          <div className="font-bold text-xl text-left ml-12 text-gradient">
            Review Product Type
          </div>
        </div>
        <div className="p-4">
          <ReviewProductType productTypeId={router.query.productTypeId} />
        </div>
      </div>
    </>
  );
};

export default ProductTypeRevision;
