import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

const DepositBarcodePrinting = () => {
  const { isLoading, data, isError } = useQuery('fetchdeposits', fetchDeposits);

  const [consumables, setConsumables] = useState<any[]>();

  useEffect(() => {
    setConsumables(data?.data);
  }, [data]);

  useEffect(() => {
    setSelectedBarcode(
      consumables != undefined ? consumables[0].barcode : undefined
    );
  }, [consumables]);
  const [selectedBarcode, setSelectedBarcode] = useState<any>('');

  const generateBarcode = async () => {
    var result = await axios.post(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Report/barcode?barcode=${selectedBarcode}`,
      {},
      { responseType: 'blob' }
    );
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(result.data);
    a.download = `${selectedBarcode}.pdf`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) {
    return <h1>Error</h1>;
  } else {
    return (
      <div className="flex flex-col w-1/2 m-auto">
        <select
          className="m-2"
          value={selectedBarcode}
          onChange={(event: any) => {
            setSelectedBarcode(event.target.value);
          }}
        >
          {consumables?.map((element: any) => {
            return (
              <option value={element.productCode}>{element.nameEng}</option>
            );
          })}
        </select>
        <button
          onClick={generateBarcode}
          className="rounded-md bg-blue-500 m-2 text-white h-12"
        >
          Generate Consumables Barcode
        </button>
      </div>
    );
  }
};

const fetchDeposits = async () => {
  return axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/consumables');
};

export default DepositBarcodePrinting;
