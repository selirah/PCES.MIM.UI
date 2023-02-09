// import React, { useEffect, useState } from 'react';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import { useSession } from 'next-auth/react';
// import WasteWashingLogs from 'components/WasteManagement/WasteWashingLogs';

// const Home = () => {
//   const router = useRouter();
//   const { data: session, status } = useSession();

//   if (status === 'loading') {
//     return <h1>'Loading...'</h1>;
//   } else if (status === 'unauthenticated') {
//     router.push('/auth/login');
//   }

//   return (
//     // You can wrap your layout component arount this block
//     <>
//       <Head>
//         <title>Waste Washing Logs</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>
//       <div className="border-b-2 h-12">
//         <div className="font-bold text-xl text-left ml-12 mt-4">
//           Waste Washing Logs
//         </div>
//       </div>
//       <WasteWashingLogs />
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import ProductTypeList from 'components/product-types/ProductTypeList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from '../../env';
import WasteWashingLogs from 'components/WasteManagement/WasteWashingLogs';

const Logs: React.FC = () => {
  const query = useQuery('allproducttypes', fetchProductTypes);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  return (
    <div className="text-center">
      {query.isLoading ? (
        <h1>Loading...</h1>
      ) : query.isError ? (
        <h1>Error</h1>
      ) : (
        <WasteWashingLogs data={data} />
      )}
    </div>
  );
};

export default Logs;

const fetchProductTypes = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/wastewashinglogs');
};