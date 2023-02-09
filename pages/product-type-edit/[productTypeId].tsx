import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import EditProductType from 'components/product-types/ProductTypeEdit';

const ProductTypeEdit: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Edit Product Type </title>
      </Head>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">
          Edit Product Type
        </div>
      </div>
      <div className="p-4">
        <EditProductType productTypeId={router.query.productTypeId} />
      </div>
    </>
  );
};

export default ProductTypeEdit;
