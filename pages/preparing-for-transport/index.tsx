import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AppLayout from 'components/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import PreparingForTransport from 'components/PreparingForTransport/PreparingForTransport';

const queryClient = new QueryClient();
const Index = () => {
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
        <title>Preparing For Transport</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="screen-background h-full">
        <div className="border-b-2 h-12">
          <div className="font-bold text-lg text-left ml-12 text-gradient">
            PREPARING FOR TRANSPORT
          </div>
        </div>
        <div className="m-4">
          <PreparingForTransport />
        </div>
      </div>
    </>
  );
};

// export getStaticProps or getServerProps here - see example below - example retrieves menu items
// export const getStaticProps = async () => {
//   return {
//     props: {
//       // menuContent is an imported file/json response from server
//       menuItems: menuContent   // menuItems will be passed as props to Home component above at line 7
//     }
//   }
// }

export default Index;
