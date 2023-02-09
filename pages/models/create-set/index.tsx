import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import axios from 'axios';
import CostCenterPicker from 'components/PreparingForTransport/CostCenterPicker';
import { useQuery } from 'react-query';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import BaseTable from 'components/general/BaseTable';
import router from 'next/router';
import { ENV } from '../../../env';
import PreviewModel from 'components/models/PreviewModel';
import { useSession } from 'next-auth/react';

const CreateSetPage: React.FC = () => {
  const costCenterQuery = useQuery('fetchCostCenters', fetchCostCenters, {
    refetchOnWindowFocus: false,
  });
  const [models, setModels] = useState<any[]>([]);
  const [setCode, setSetCode] = useState<string>('');
  const [copies, setCopies] = useState<number>(1);
  const [setDescriptionEng, setSetDescriptionEng] = useState<string>('');
  const [setExpirationDate, setSetExpirationPeriod] = useState<string>();

  const [selectedModel, setSelectedModel] = useState<any>();
  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };
  const fetchModels = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + `/SetModel`
    );
  };
  const modelsQuery = useQuery('fetchmodels', fetchModels, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (modelsQuery.data != undefined) {
      setModels(modelsQuery.data.data);
      setSelectedModel(
        models.find(
          (element: any) =>
            element.setModelId == modelsQuery.data.data[0].setModelId
        )
      );
    }
  }, [modelsQuery.data]);
  useEffect(() => {
    if (selectedModel) {
      setSetExpirationPeriod(selectedModel.ExpirationPeriod + 'Months');
    }
  }, [selectedModel]);

  const [costCenters, setCostCenters] = useState<any>();
  const [operationRoomId, setOperationRoomId] = useState<number>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const{data:session} = useSession()

  useEffect(() => {
    if (costCenterQuery.data != undefined) {
      setCostCenters(costCenterQuery.data.data);
    }
  }, [costCenterQuery.data]);

  const downloadBarcode = async (setId: number, name: string) => {
    try {
      var result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Report/barcodeWithProducts?setId=${setId}`,
        {},
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([result.data]));
      a.download = name;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const toSubmit = {
      setModelId: selectedModel.setModelId,
      operationRoomId: operationRoomId,
      copies,
      userId:session.user.userDTO.userId
    };

    console.log(toSubmit);
    try {
      var result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/CreateSetByModel',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <>
      <Head>
        <title>Create Set</title>
      </Head>
      <div className="screen-background">
      <div className="border-b-2 border-blue-navy h-12">
        <div className="font-bold text-lg p-2 text-left ml-12 text-gradient">CREATE SET</div>
      </div>
      <div className="p-4">
        <div className="w-full flex justify-between  ">
          <div className="w-full justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4">
            <label className="text-sm text-gray-600 font-bold">
              Set Information
            </label>
            <div className="mt-6 w-full border-b-2"></div>
            <div className="mt-2 flex-col flex">
              <label className="mt-4 font-semibold text-sm">Set Model</label>
              <select
                className="rounded-md bg-gray-50"
                value={selectedModel?.setModelId}
                onChange={(event: any) => {
                  setSelectedModel(
                    models.find(
                      (element: any) => element.setModelId == event.target.value
                    )
                  );
                }}
              >
                <option value={0} className="text-gray-500">
                  Select a model...
                </option>
                {models.map((element: any) => {
                  return (
                    <option
                      key={element.setModelId}
                      className="bg-white"
                      value={element.setModelId}
                    >
                      {element.nameEng}
                    </option>
                  );
                })}
              </select>
              <label className="mt-4 font-semibold text-sm">Copies</label>
              <input
                type="number"
                className="rounded-md"
                value={copies}
                onChange={(event: any) => {
                  if (event.target.value < 1) {
                    return;
                  }
                  setCopies(event.target.value);
                }}
              />
            </div>
          </div>
          <CostCenterPicker
            cities={costCenters?.cities}
            hospitals={costCenters?.hospitals}
            clinics={costCenters?.clinics}
            operationRooms={costCenters?.operationRooms}
            setOperationRoomId={setOperationRoomId}
          />
        </div>
        {selectedModel ? <PreviewModel setModelId={selectedModel.setModelId}/>:null}
        <button
          className="w-full h-12 mt-4 font-semibold text-white font-play bg-gradient-button rounded-md"
          onClick={handleSubmit}
        >
          CREATE SET
        </button>
      </div>
      </div>
      {showError ? (
        <GeneralFailPopup
          setShow={setShowError}
          errorMessage="Something went wrong. Try again"
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage={'Set created successfully'}
          buttonLink="/"
          buttonMessage={'Ok'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

const fetchCostCenters = async () => {
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/costcentersfordropdown'
  );
  return result;
};

export default CreateSetPage;
