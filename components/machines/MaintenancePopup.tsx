import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ENV } from '../../env';
import Image from 'next/image';
import { getBase64 } from 'interfaces/Functions';
import { useSession } from 'next-auth/react';

interface Props {
  show: boolean;
  setShow: any;
  machineId: number | undefined;
}

const MaintenancePopup: React.FC<Props> = (props) => {
  const { show, setShow, machineId } = props;
  const [reason, setReason] = useState<string>('Normal Maintenance');
  const [partName, setPartName] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [lotNumber, setLotNumber] = useState<number>();
  const [date, setDate] = useState<string>('');
  const [fileContents, setFileContents] = useState<any>();

  const { data: session } = useSession();

  const submit = async () => {
    const toSubmit = {
      machineId,
      reason,
      partName,
      serialNumber,
      lotNumber,
      date,
      userId: session.user.userDTO.userId,
      maintenanceReport: fileContents,
    };
    await axios.post(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/maintenancePost',
      toSubmit
    );
    setSerialNumber('');
    setDate('');
    setPartName('');
    setLotNumber(0);
    setShow(false);
  };

  return show ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
      onClick={(event: any) => {
        if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
          setShow(false);
        }
      }}
    >
      <div className="rounded-md relative w-full max-w-screen-sm bg-blend-overlay bg-white">
        <div className="w-full border-b-2 font-semibold text-lg flex justify-between">
          <span className="p-4">Replace Part</span>
          <button
            className="mr-4 text-2xl -mt-8 hover:scale-125 hover:text-red-600"
            onClick={() => {
              setShow(false);
            }}
          >
            x
          </button>
        </div>
        <div className="p-4">
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">
              Reason For Replacement
            </label>
            <select
              className="rounded-md bg-gray-50 w-1/2"
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
              }}
            >
              <option className="bg-white" value="Normal Maintenance">
                Normal Maintenance
              </option>
              <option className="bg-white" value="Damaged">
                Damaged
              </option>
            </select>
          </div>
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">Part Name</label>
            <input
              className="border-2 border-gray-400 rounded-md w-1/2"
              type="text"
              value={partName}
              onChange={(event) => {
                setPartName(event?.target.value);
              }}
            />
          </div>
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">Serial Number</label>
            <input
              className="border-2 border-gray-400 rounded-md w-1/2"
              value={serialNumber}
              min="0"
              type="number"
              onChange={(event) => {
                setSerialNumber(event?.target.value);
              }}
            />
          </div>
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">Lot Number</label>
            <input
              type="number"
              className="border-2 border-gray-400 rounded-md w-1/2"
              value={lotNumber}
              onChange={(event: any) => {
                setLotNumber(event?.target.value);
              }}
            />
          </div>
          <div className="flex justify-between mb-3">
            <label className="font-semibold text-gray-700">
              Date Of Replacement
            </label>
            <input
              type="date"
              className="border-2 border-gray-400 rounded-md w-1/2"
              value={date}
              onChange={(event) => {
                setDate(event?.target.value);
              }}
            />
          </div>
          <div className="flex justify-between">
            <div className='w-1/2'>
              <label className="cursor-pointer border-2 bg-blue-even-lighter text-gradient border-blue-ocean  font-play font-semibold text-xl p-2 rounded-md ">
                Browse
                <input
                  className="hidden"
                  onChange={(event: any) => {
                    getBase64(event.target.files[0], setFileContents)
                  }}
                  type="file"
                  accept="image/*"
                />
              </label>
            </div>
            <div className="w-1/2">
              {fileContents && fileContents != '' ? <img src={fileContents} /> : null}
            </div>
          </div>
        </div>
        <button
          onClick={submit}
          className="text-white bg-gradient-top-bottom font-semibold font-play p-2 w-full rounded-md"
        >
          Submit
        </button>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MaintenancePopup;
