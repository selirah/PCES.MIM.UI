import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import CostCenterPicker from 'components/PreparingForTransport/CostCenterPicker';
import router from 'next/router';
import react, { useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  data: any;
}

const EditSetDetails: React.FC<Props> = (props: Props) => {
  const { data } = props;

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [costCenters, setCostCenters] = useState<any>();
  const [operationRoomId, setOperationRoomId] = useState<number>();

  const [setCode, setSetCode] = useState<string>('');
  const [setId, setSetId] = useState<number>();
  const [selectedModelId, setSelectedModelId] = useState<number>();
  const [selectedModel, setSelectedModel] = useState<any>();
  const [allModels, setAllModels] = useState<any[]>([]);
  const [setDescriptionEng, setSetDescriptionEng] = useState<string>('');
  const [setExpirationDate, setSetExpirationPeriod] = useState<string>();

  const [Show, setShow] = useState<any>(false);

  useEffect(() => {
    if (data != undefined) {
      setSelectedModelId(data.setModelId);
      setSetCode(data.setCode);
      setSetId(data.setId);
      setSelectedModel(
        allModels.find((element: any) => element.SetModelId == data.setModelId)
      );
      setSetDescriptionEng(data.descriptionEng);
    }
  }, [data]);
  useEffect(() => {
    if (selectedModel) {
      setSetExpirationPeriod(selectedModel.ExpirationPeriod + 'Months');
    }
  }, [selectedModel]);

  const handleSubmit = async () => {
    const toSubmit = {
      setCode,
      setModelId: selectedModelId,
      setId,
      // OperationRoomId: operationRoomId,
    };
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/Set?operationRoomId=' +
          operationRoomId,
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };
  const fetchAllModels = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + `/SetModel/withProductTypes`
    );
  };
  const allModelsQuery = useQuery('fetchallmodels', fetchAllModels, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (allModelsQuery.data != undefined) {
      setAllModels(allModelsQuery.data.data);
    }
  }, [allModelsQuery.data]);

  const fetchModels = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/SetModel/setModelByIdWithProductTypes?setModelId=${selectedModelId}`
    );
  };
  const modelsQuery = useQuery('fetchmodels', fetchModels, {
    enabled: selectedModelId != undefined,
  });

  useEffect(() => {
    if (modelsQuery.data != undefined) {
      setSelectedModel(modelsQuery.data.data);
    }
  }, [modelsQuery.data]);

  const [location, setLocation] = useState<any>();

  const fetchLocation = async () => {
    var result = await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/setLocationBySetId?setId=${setId}`
    );
    return result;
  };

  const locationQuery = useQuery('fetchLocation', fetchLocation, {
    enabled: setId != undefined,
  });

  useEffect(() => {
    if (locationQuery.data != undefined) {
      setLocation(locationQuery.data.data[0]);
    }
  }, [locationQuery.data]);
  useEffect(() => {
    console.log(location);
  }, [location]);
  const fetchCostCenters = async () => {
    const result = await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/costcentersfordropdown'
    );
    return result;
  };
  const costCenterQuery = useQuery('fetchCostCenters', fetchCostCenters, {
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (costCenterQuery.data != undefined) {
      setCostCenters(costCenterQuery.data.data);
    }
  }, [costCenterQuery.data]);

  useEffect(() => {
    console.log(costCenters);
  }, [costCenters]);
  const productColumns = [
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    },
    {
      Header: 'Container',
      accessor: 'Container',
    },
    {
      Header: 'Tray',
      accessor: 'Tray',
    },
    {
      Header: 'Quantity',
      accessor: 'Quantity',
    },
  ];
  return (
    <>
      <div className="p-4">
        <div className="w-full flex justify-between  ">
          <div className="w-full justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4">
            <label className="text-sm  font-bold">Set Information</label>
            <div className="mt-6 w-full border-b-2"></div>
            <div className="mt-2 flex-col flex">
              <label className="font-semibold text-sm">Set Code</label>
              <input
                type="text"
                className="rounded-md bg-gray-100"
                value={setCode}
                readOnly
              />

              <label className="mt-4 font-semibold text-sm">Set Name</label>
              <select
                className="rounded-md"
                value={selectedModelId}
                onChange={(event: any) => {
                  setSelectedModel(
                    allModels.find(
                      (element: any) => element.SetModelId == event.target.value
                    )
                  );
                  setSelectedModelId(event.target.value);
                }}
              >
                {allModels.map((element: any) => {
                  return (
                    <option
                      key={element.SetModelId}
                      className="bg-white"
                      value={element.SetModelId}
                    >
                      {element.NameEng}
                    </option>
                  );
                })}
              </select>
              <label className="mt-4 font-semibold text-sm">
                Set Description
              </label>
              <input
                type="text"
                className="rounded-md bg-gray-100"
                readOnly
                value={selectedModel?.DescriptionEng}
              />
              <label className="mt-4 font-semibold text-sm">
                Set Complexity:
              </label>
              <input
                type="text"
                readOnly
                className="rounded-md bg-gray-100"
                value={selectedModel?.ComplexityType}
              />
            </div>
          </div>
          <CostCenterPicker
            cities={costCenters?.cities}
            hospitals={costCenters?.hospitals}
            clinics={costCenters?.clinics}
            operationRooms={costCenters?.operationRooms}
            CityId={location?.CityId}
            HospitalId={location?.HospitalId}
            ClinicId={location?.ClinicId}
            OperationRoomId={location?.OperationRoomId}
            setOperationRoomId={setOperationRoomId}
          />
        </div>
        <div className="flex gap-4">
          <div className="w-1/3">
            <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Model Information
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Name:</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.NameEng}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">
                    Description:
                  </label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.DescriptionEng}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Code:</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.ModelCode}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">
                    Expiration Type:
                  </label>
                  <input
                    type="text"
                    readOnly
                    className="rounded-md w-1/2 bg-gray-100"
                    value={setExpirationDate}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Model Details
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Height(mm):</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.Height?.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Width(mm):</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.Width.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Length(mm):</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.Length.toFixed(2)}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Weight(gr):</label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.Weight.toFixed(2)}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Other Information
              </div>
              <div className="p-4">
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">
                    Number of Trays:
                  </label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.LayersNumber}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">
                    Number of Envelopes:
                  </label>
                  <input
                    type="text"
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.EnvelopeNumber}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">Notes:</label>
                  <textarea
                    rows={1}
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.Notes}
                    readOnly
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <label className="font-semibold w-1/2 p-2">
                    Warning Notes:
                  </label>
                  <textarea
                    rows={1}
                    className="rounded-md w-1/2 bg-gray-100"
                    value={selectedModel?.WarningNotes}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl font-bold pt-4 px-4">
          Products
        </div>
        <div className="w-full mt-4 mb-4 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable
            data={
              selectedModel && selectedModel.productTypes
                ? selectedModel.productTypes
                : []
            }
            columns={productColumns}
          />
        </div>
      </div>
      <div>
        <button
          className="w-full h-12 mt-4 font-semibold text-white bg-blue-800 rounded-md"
          onClick={handleSubmit}
        >
          Update Set
        </button>
        {showError ? (
          <GeneralFailPopup
            errorMessage={errorMessage}
            setShow={setShowError}
          />
        ) : (
          ''
        )}
        {showSuccess ? (
          <GeneralSuccessPopup
            buttonLink={'/'}
            buttonMessage={'Back To Home'}
            successMessage={'Successfully updated model'}
            onClick={onClick}
          />
        ) : (
          ''
        )}{' '}
      </div>
    </>
  );
};

export default EditSetDetails;
