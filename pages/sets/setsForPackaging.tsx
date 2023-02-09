import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Set } from 'interfaces/Sets';
import SetsForPackagingTable from 'components/sterilization/SetsForPackagingTable';
import BarcodeSearchPackaging from 'components/sets/BarcodeSearchPackaging';
import { ENV } from '../../env';

const getSets = async () => {
  // console.log(barcode)
  const response = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/washedSets`);
  const { data } = response;
  return data;
};
type Barcode = string;

const SetsForPackaging: React.FC = () => {
  // const queryClient = new QueryClient()
  const [setDetails, setSetDetails] = useState<Set[]>();
  const [barcode, setBarcode] = useState<Barcode>();

  const { data, refetch, isLoading } = useQuery('setsForPackaging', getSets);

  // const getSetDetailsByBarcode = async () => {
  //   // console.log(barcode)
  //   const response = await axios.get(
  //     ENV.NEXT_PUBLIC_API_ENDPOINT +
  //       `/Set/simplifiedSetDetailsByBarcode?setBarcode=${barcode}`
  //   );
  //   const { data } = response;
  //   return data;
  // };
  const onSubmitBarcode = () => {
    refetch();
  };
  useEffect(() => {
    if (data) {
      setSetDetails(data);
    }
  }, [data, refetch]);

  return (
    <>
      <Head>
        <title>Sets for Packaging</title>
      </Head>
      <div className="w-full flex flex-col px-4 py-8 font-play">
        <div className="w-full flex flex-col ">
          <h4 className="text-lg font-bold">Sets for Packaging</h4>
        </div>
        <BarcodeSearchPackaging
          setBarcode={setBarcode}
          isLoading={isLoading}
          onSubmitBarcode={onSubmitBarcode}
          barcode={barcode}
        />
        <div className="w-full  mt-2 py-4">
          <div className="w-full flex flex-col  shadow-md rounded-md">
            <SetsForPackagingTable setDetails={setDetails} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SetsForPackaging;
