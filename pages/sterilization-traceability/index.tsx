import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import SetTraceability from 'components/sets/SetTraceability';
import SterilizationTraceability from 'components/sterilization/SterilizationTraceability';
import { ENV } from '../../env';
import router from 'next/router';
import SetDetails from 'components/sterilization/SetDetails';
import PackagingHistory from 'components/sterilization/PackagingHistory';
import AutoclavesHistory from 'components/sterilization/AutoclavesHistory';
import WashingHistory from 'components/sterilization/WashingHistory';
import Interventions from 'components/sterilization/Interventions';

const SterilizationHistory: React.FC = () => {
  const [barcode, setBarcode] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [setDetails, setSetDetails] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [data, setData] = useState<any>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [setDataa, setSetData] = useState<any>([]);
  const [show, setShow] = useState<boolean>(false);
  const [setCode,setSetCode] = useState();
  const [autoclavesHistory,setAutoclavesHistory] = useState<any>([]);
  const [washingHistory,setWashingHistory] = useState<any>([]);
  const [sterilizationHistory,setSterilizationHistory] = useState<any>([]);
  const [packagingHistory,setPackagingHistory] = useState<any>([]);
  const [interventionsHistory,setInterventionsHistory] = useState<any>([]);

  
 

  useEffect(() => {
    setData(data);
    var autoclavesHistoryList = []
    var washingHistoryList = []
    var sterilizationHistoryList = []
    var packagingHistoryList = []
    var interventionsList = []
    data.forEach((item)=>{
       if(item.AutoclaveNumber) 
        autoclavesHistoryList.push(item)
        else if(item.MachineCode)
        washingHistoryList.push(item)
        else if (item.DatePackaging)
        packagingHistoryList.push(item)
        else if( item.OperationRoomOfIntervention)
        sterilizationHistoryList.push(item)
        else if(item.InterventionCode)
        interventionsList.push(item)
      }
    )
    setAutoclavesHistory(autoclavesHistoryList)
    setWashingHistory(washingHistoryList)
    setPackagingHistory(packagingHistoryList)
    setSterilizationHistory(sterilizationHistoryList)
    setInterventionsHistory(interventionsList)
    console.log('autoclaves1:',autoclavesHistory)
    console.log('washing:',washingHistory)
    console.log('sterilization:',sterilizationHistory)
    console.log('packaging:',packagingHistory)
  }, [data]);

  const downloadSterilizationTraceability = async () => {
    try {
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Report/sterilizationTraceabilityForm?barcode=${barcode}`,
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `SterilizationTraceabilityForm.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };
  const onSubmitBarcode = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/Process/SterilizationHistory?barcode=' +
          barcode
      );
      setIsLoading(false);
      setData(result.data);
    } catch (error) {}
  };
  console.log(data);
  console.log(setDataa);
  // const onClick = (e) => {
  //   e.preventDefault();
  //   setShow(false);
  //   setShowSuccess(false);
  //   router.push('/');
  // };

  return (
    <div>
      <>
        <div className="p-4">
          <div className="flex flex-col text-left text-xl font-bold pt-4 px-4">
            Sterilization Traceability
          </div>
          <BarcodeSearch
            setBarcode={setBarcode}
            isLoading={isLoading}
            onSubmitBarcode={onSubmitBarcode}
          />
        </div>
        <div className="flex gap-4 mt-4 p-3 font-play font-semibold">
        <button
          onClick={() => {
            downloadSterilizationTraceability();
          }}
          className="p-2 bg-blue-900 text-white rounded-md w-full"
        >
          Generate Sterilization Traceability Form
        </button>
        </div>
        <div className="w-full flex flex-col mt-2 px-4 py-4">
          <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <SetDetails data={data} />
          </div>
        </div>
        <div className="w-full flex flex-col mt-2 px-4 py-4">
        <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <SterilizationTraceability data={sterilizationHistory} />
          </div>
          <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <Interventions data={interventionsHistory} />
          </div>
        <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <WashingHistory data={washingHistory} />
          </div>
          <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <PackagingHistory data={packagingHistory} />
          </div>
          <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-900">
            <AutoclavesHistory data={autoclavesHistory} />
          </div>
        </div>
      </>
    </div>
  );
};

export default SterilizationHistory;
