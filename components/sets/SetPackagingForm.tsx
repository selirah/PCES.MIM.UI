import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from '../../env';

type Props = {
  data: any;
  weight: string;
  setWeight: any;
};

const SetDetailsForm: React.FC<Props> = (props) => {
  const {
    data,
    weight,
    setWeight
  } = props;


  return (
    <>
      <div className="w-full flex gap-2 mt-2 px-4">
        <div className="w-1/3 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
            Set Details
          </div>
          <div className="p-4">
            <div>
              <label className="font-semibold">Name Eng</label>
              <input
                type="text"
                value={data?.NameEng}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Description Eng</label>
              <input
                type="text"
                value={data?.DescriptionEng}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Name Local</label>
              <input
                type="text"
                value={data?.NameLocal}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Description Local</label>
              <input
                type="text"
                value={data?.DescriptionLocal}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
            Cost Center
          </div>
          <div className="p-4">
            <div>
              <label className="font-semibold">City</label>
              <input
                type="text"
                value={data?.city}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Clinic</label>
              <input
                type="text"
                value={data?.clinic}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Operation Room</label>
              <input
                type="text"
                value={data?.operationRoom}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Hospital</label>
              <input
                type="text"
                value={data?.hospital}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-1/3 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
            Set Composition
          </div>
          <div className="p-4">
            <div>
              <label className="font-semibold">Total Instruments</label>
              <input
                type="text"
                value={data?.total}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Counted Instruments</label>
              <input
                type="text"
                value={data?.ReceivedInstruments}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Number of Containers</label>
              <input
                type="text"
                value={data?.Containers.length}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Number of Trays</label>
              <input
                type="text"
                value={data?.totalTrays}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Weight</label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetDetailsForm;
