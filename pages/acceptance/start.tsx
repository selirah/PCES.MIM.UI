import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import axios from 'axios';
import NewInterventionForm from 'components/acceptance-screens/NewInterventionForm';
import { ENV } from '../../env';

type Barcode = string;

const Acceptance: React.FC = () => {
  const [barcode, setBarcode] = useState<Barcode>();
  const [acceptanceDetails, setAcceptanceDetails] = useState(null);

  const getAcceptanceDetails = async () => {
    // console.log(barcode)
    const response = await axios.get(
      `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/itemByBarcode?itemBarcode=${barcode}`
    );
    const { data } = response;
    return data;
  };

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  const { data, refetch, isLoading } = useQuery(
    'setDetails',
    getAcceptanceDetails,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  const onSubmitBarcode = () => {
    refetch();
  };

  useEffect(() => {
    if (data) {
      setAcceptanceDetails(data);
    }
  }, [data, refetch]);

  return (
    <>
      <Head>
        <title>Acceptance</title>
      </Head>
      <div className="w-full flex flex-col px-9 py-8 font-play">
        <div className="w-full flex flex-col">
          <h4 className="text-lg font-bold">Acceptance</h4>
        </div>
        <BarcodeSearch
          setBarcode={setBarcode}
          isLoading={isLoading}
          onSubmitBarcode={onSubmitBarcode}
        />
        <div className="w-full flex flex-col shadow-md rounded-md mt-4 border-blue-800 border-t-4 pb-4">
          <div className="flex flex-col text-base font-bold pt-4 px-4">
            Acceptance Details
          </div>

          {acceptanceDetails && acceptanceDetails !== undefined ? (
            <NewInterventionForm
              path="acceptance"
              onSubmit={handleSubmit}
              submission={{ data: acceptanceDetails }}
            />
          ) : (
            <p className="px-4 pt-4">
              We do not have any data available now. Please perform a search to
              begin
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Acceptance;
