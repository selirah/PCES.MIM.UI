import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import PreviewModel from 'components/models/PreviewModel';
import PreviewModelNoProducts from 'components/models/PreviewModelNoProducts';
import CostCenterPicker from 'components/PreparingForTransport/CostCenterPicker';
import react, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  data: any;
}

const PreviewSetDetailsNoProducts: React.FC<Props> = (props: Props) => {
  const { data } = props;

  const [setCode, setSetCode] = useState<string>('');
  const [setId, setSetId] = useState<number>();
  const [selectedModelId, setSelectedModelId] = useState<number>();
  const [selectedModel, setSelectedModel] = useState<any>();
  const [setStatus,setSetStatus] = useState<string>('');

  useEffect(() => {
    if (data != undefined) {
      setSetCode(data.setCode);
      setSelectedModelId(data.setModelId);
      setSetId(data.setId);
      setSetStatus(data.setStatus.nameEng);
    }
  }, [data]);

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

  return (
    <>
      <div className="p-4">
        <div className="w-full flex justify-between  ">
          <div className="w-full justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4">
            <label className="text-sm text-gray-600 font-bold">
              Set Information
            </label>
            <div className="mt-6 w-full border-b-2"></div>
            <div className="mt-2 flex-col flex">
              <label className="font-semibold text-sm">Set Code</label>
              <input
                type="text"
                className="rounded-md bg-gray-100"
                value={setCode}
                readOnly
              />
            </div>
            <div className="mt-2 flex-col flex">
              <label className="font-semibold text-sm">Set Status</label>
              <input
                type="text"
                className="rounded-md bg-gray-100"
                value={setStatus}
                readOnly
              />
            </div>
          </div>
          <div className="w-full justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4">
            <label className="text-sm text-gray-600 font-bold">
              Cost Center
            </label>
            <div className="mt-6 w-full border-b-2"></div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                City:
              </label>
              <input
                type="text"
                readOnly
                className="rounded-md w-full bg-gray-100"
                value={location?.City}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Hospital:
              </label>
              <input
                type="text"
                readOnly
                className="rounded-md w-full bg-gray-100"
                value={location?.Hospital}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Clinic:
              </label>
              <input
                type="text"
                readOnly
                className="rounded-md w-full bg-gray-100"
                value={location?.Clinic}
              />
            </div>
            <div className="mt-3">
              <label className="text-sm text-gray-800 w-2/6 font-semibold">
                Operation Room:
              </label>
              <input
                type="text"
                readOnly
                className="rounded-md w-full bg-gray-100"
                value={location?.OperationRoom}
              />
            </div>
          </div>
        </div>
        <PreviewModelNoProducts setModelId={`${selectedModelId}`}/>
      </div>
    </>
  );
};

export default PreviewSetDetailsNoProducts;
