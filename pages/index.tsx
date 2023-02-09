import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { BounceLoader } from 'react-spinners';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';

const Home = () => {
  const { data: session, status } = useSession();
  const intl = useIntl();
  const router = useRouter();
  if (status === 'unauthenticated') {
    router.push('auth/login');
  } else if (status === 'loading') {
    return (
      <div className="w-full h-full m-auto">
        <BounceLoader color="#003E78" />
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="screen-background h-full">
        <div className="border-b-2 p-2 rounded-md">
          <div className="font-extrabold font-play text-2xl text-gradient">
            <FormattedMessage defaultMessage="HOME PAGE" />
          </div>
          <div>
            {intl.formatMessage({
              defaultMessage: 'Test',
            })}
          </div>
        </div>
        <div className="font-semibold h-full text-indigo-700 p-8">
          <FormattedMessage defaultMessage="Welcome to the Medical Instruments Management Dashboard" />
        </div>
      </div>
    </>
  );
};

export default Home;
