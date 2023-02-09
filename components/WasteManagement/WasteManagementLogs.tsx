import axios from 'axios';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import React, { useState } from 'react';
import { ENV } from '../../env';

const WasteManagementLogs: React.FC = () => {
  const [barcode, setBarcode] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({
    dateOfIntervention: '',
    dateOfTransport: '',
    dateOfTreatment: '',
  });

  const onSubmitBarcode = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/Set/wasteManagementLogsByBarcode?barcode=' +
          barcode
      );
      setIsLoading(false);
      setData(result.data);
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full flex flex-col px-6 py-5 font-play">
        <div className="p-4">
          <div className="w-full flex flex-col">
            <h4 className="text-xl font-bold">Waste Management Logs</h4>
          </div>
          <BarcodeSearch
            setBarcode={setBarcode}
            isLoading={isLoading}
            onSubmitBarcode={onSubmitBarcode}
          />
        </div>
        <div className="p-4">
          <div className="w-1/3 justify-between shadow-md rounded-md border-t-2 p-4">
            <label className="text-md text-gray-600 font-bold">
              Log Details
            </label>
            <div className="mt-6 w-full border-b-2"></div>
            <div className="mt-2">
              <label className="text-sm text-gray-700 w-1/6 font-semibold">
                Date of Intervention:
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md"
                value={data.dateOfIntervention.substr(0, 16).replace('T', ' ')}
                readOnly={true}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-700 w-1/6 font-semibold">
                Date of Transport:
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md"
                value={data.dateOfTransport.substr(0, 16).replace('T', ' ')}
                readOnly={true}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-700 w-1/6 font-semibold">
                Date of Treatment:
              </label>
              <input
                type="text"
                className="w-full bg-gray-100 rounded-md"
                value={data.dateOfTreatment.substr(0, 16).replace('T', ' ')}
                readOnly={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WasteManagementLogs;
