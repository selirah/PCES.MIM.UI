import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import WasteWashing from 'components/WasteManagement/WasteWashing';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <h1>'Loading...'</h1>;
  } else if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  return (
    // You can wrap your layout component arount this block
    <>
      <Head>
        <title>Bin Washing</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b-2 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">
          Bin Washing
        </div>
      </div>
      <WasteWashing />
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

export default Home;
