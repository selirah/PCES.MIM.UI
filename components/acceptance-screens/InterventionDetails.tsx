import React, { useEffect, useState } from 'react';
import Intervention from './Intervention';

interface Props {
  setInterventionDetails: any;
  setFile: any;
  city?: string;
  hospital?: string;
  clinic?: string;
  operationRoom?: string;
  file: string
}

const InterventionDetails: React.FC<Props> = (props) => {
  const {
    setInterventionDetails,
    setFile,
    city,
    hospital,
    file,
    clinic,
    operationRoom,
  } = props;
  const [operationRoomId, setOperationRoomId] = useState<number>(0);

  const [intervention, setIntervention] = useState<any>({
    code: '',
    date: '',
    interventionTypeId: 0,
    complexityTypeId: 0,
  });

  useEffect(() => {
    setInterventionDetails({ ...intervention, operationRoomId });
  }, [operationRoomId, intervention]);

  return (
    <div className="w-full flex justify-between mt-4 p-2 pb-4">
      <Intervention
        intervention={intervention}
        setIntervention={setIntervention}
        setFile={setFile}
        file={file}
      />
      <div className="w-1/2 m-2 mt-4">
        <div className="w-full justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4">
          <label className="text-sm text-gray-600 font-bold">Cost Center</label>
          <div className="mt-6 w-full border-b-2"></div>
          <div className="mt-2">
            <label className="text-sm text-gray-800 w-1/6 font-semibold">
              City:
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 rounded-md border-indigo-900"
              value={city}
              disabled={true}
            />
          </div>
          <div className="mt-3">
            <label className="text-sm text-gray-800 w-1/6 font-semibold">
              Hospital:
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 rounded-md border-indigo-900"
              value={hospital}
              disabled={true}
            />
          </div>
          <div className="mt-2">
            <label className="text-sm text-gray-800 w-1/6 font-semibold">
              Clinic:
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 rounded-md border-indigo-900"
              value={clinic}
              disabled={true}
            />
          </div>
          <div className="mt-3">
            <label className="text-sm text-gray-800 w-2/6 font-semibold">
              Operation Room:
            </label>
            <input
              type="text"
              className="w-full bg-gray-50 rounded-md border-indigo-900"
              value={operationRoom}
              disabled={true}
            />
          </div>
        </div>
        <div className="w-full flex">
          <div className="w-1/3 justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4 flex-auto">
            <label className="text-sm text-gray-600 font-bold">Surgeon</label>
            <div className="mt-6 w-full border-b-2 mb-3"></div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Name:
              </label>
              <input
                type="text"
                className="w-full rounded-md border-indigo-900"
                value={intervention.surgeonName}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.surgeonName = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Surname:
              </label>
              <input
                type="text"
                className="w-full  rounded-md border-indigo-900"
                value={intervention.surgeonSurname}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.surgeonSurname = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Firm:
              </label>
              <input
                type="text"
                className="w-full  rounded-md border-indigo-900"
                value={intervention.surgeonFirm}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.surgeonFirm = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
          </div>
          <div className="w-1/3 justify-between shadow-md rounded-md mt-4 border-t-2 m-2 p-4 flex-auto">
            <label className="text-sm text-gray-600 font-bold">Nurse</label>
            <div className="mt-6 w-full border-b-2 mb-3"></div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Name:
              </label>
              <input
                type="text"
                className="w-full  rounded-md border-indigo-900"
                value={intervention.nurseName}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.nurseName = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Surname:
              </label>
              <input
                type="text"
                className="w-full  rounded-md border-indigo-900"
                value={intervention.nurseSurname}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.nurseSurname = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
            <div className="mt-2">
              <label className="text-sm text-gray-800 w-1/6 font-semibold">
                Firm:
              </label>
              <input
                type="text"
                className="w-full  rounded-md border-indigo-900"
                value={intervention.nurseFirm}
                onChange={(event: any) => {
                  let copy = { ...intervention };
                  copy.nurseFirm = event.target.value;
                  setIntervention(copy);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterventionDetails;
