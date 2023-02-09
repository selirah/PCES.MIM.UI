import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

const BarcodePrinting = () => {
  const { isLoading, data, isError } = useQuery('fetchsets', fetchSets);

  const [sets, setSets] = useState<any[]>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setSets(data?.data);
  }, [data]);

  useEffect(() => {
    setSelectedBarcode(sets != undefined ? sets[0].setCode : undefined);
  }, [sets]);
  const [selectedBarcode, setSelectedBarcode] = useState<any>('');

  const generateBarcode = async () => {
    var result = await axios.post(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Report/allSetsWithContainersAndTrays?setCode=${selectedBarcode}`,
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
          {sets?.map((element: any) => {
            return <option value={element.setCode}>{element.setCode}</option>;
          })}
        </select>
        <button
          onClick={generateBarcode}
          className="rounded-md bg-blue-500 m-2 text-white h-12"
        >
          Generate Set Barcode
        </button>
      </div>
    );
  }
};

const fetchSets = async () => {
  return axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/allSets');
};

export default BarcodePrinting;
