import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AppLayout from 'components/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import ReviewOrder from 'components/warehouse/ReviewOrder';

const queryClient = new QueryClient();

const Request = ({}) => {
  const router = useRouter();
  const [_, setAppSession] = useState<Session>();
  const [__, setLoader] = useState(false);
  useEffect(() => {
    setLoader(true);
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setLoader(false);
        setAppSession(session);
      }
    });
  }, [router]);

  return (
    // You can wrap your layout component arount this block
    <>
      <Head>
        <title>Review Order For Supplier</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='screen-background h-full'>
      <div className="border-b-2 h-12">
        <div className="font-semibold font-play text-left ml-12 text-gradient">
          REVIEW ORDER FOR SUPPLIER
        </div>
      </div>
      <ReviewOrder supplierId={router.query.supplierId} />
      </div>
    </>
  );
};

export default Request;
