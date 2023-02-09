import AppLayout from 'components/AppLayout';
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PreviewSet from 'components/sets/PreviewSet';


const PreviewSetPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = ()=>{
    const toSubmit={
      setId:router.query.setId
    }

  }

  return (
    <>
      <Head>
        <title>Transport Set</title>
      </Head>
      <div className="screen-background">
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-play font-semibold text-left ml-12 text-gradient">
          TRANSPORT SET
        </div>
      </div>
      <div className="p-4">
        <PreviewSet setId={router.query.setId}/>
        <button className="w-full bg-gradient-button text-white font-semibold font-play rounded-md py-4" onClick={()=>{handleSubmit()}}>Submit</button>
      </div>
      </div>
    </>
  );
};

export default PreviewSetPage;
