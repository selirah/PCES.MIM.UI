import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import SetTraceability from 'components/sets/SetTraceability';
import { ENV } from '../../../env';

const Traceability: React.FC = () => {
  const [barcode, setBarcode] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const onSubmitBarcode = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/Set/allSetsWithStatus?barcode=' +
          barcode
      );
      setIsLoading(false);
      setData(result.data);
    } catch (error) {}
  };
  console.log(data);

  return (
    <div>
      <>
        <div className="p-4">
          <div className="flex flex-col text-left text-xl font-bold pt-4 px-4">
            Set Traceability
          </div>
          <BarcodeSearch
            setBarcode={setBarcode}
            isLoading={isLoading}
            onSubmitBarcode={onSubmitBarcode}
          />
        </div>
        <div className="flex">
          <div className="p-2 w-1/2">
            <div className="w-full justify-between shadow-md rounded-md mt-4 m-2 p-4 border-t-4 border-blue-900">
              <label className="text-sm text-gray-600 font-bold">
                Set Information
              </label>
              <div className="mt-6 w-full border-b-2"></div>
              <div className="">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <label className="font-semibold text-sm w-1/2">
                      Set Code:
                    </label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={data[0]?.SetCode}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold text-sm w-1/2">
                      Set Name:
                    </label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={data[0]?.NameEng}
                      readOnly
                    ></input>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex-col flex">
                <label className="mt-4 font-semibold text-sm">
                  Set Description:
                </label>
                <input
                  type="text"
                  readOnly
                  className="rounded-md bg-gray-100"
                  value={data[0]?.DescriptionEng}
                />
                <label className="mt-4 font-semibold text-sm">Barcode:</label>
                <input
                  type="text"
                  readOnly
                  className="rounded-md  bg-gray-100"
                  value={data[0]?.Barcode}
                />
                <label className="mt-4 font-semibold text-sm">Status:</label>
                <input
                  type="text"
                  className="rounded-md bg-gray-100"
                  value={data[0]?.Status}
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 flex flex-col mt-2 p-4">
            <div className="w-full flex shadow-md rounded-md border-t-4 border-blue-900">
              <SetTraceability data={data} />
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Traceability;
