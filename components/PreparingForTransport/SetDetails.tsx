import React, { useEffect, useState } from 'react';

interface Props {
  data: any
}

const SetDetails: React.FC<Props> = (props: Props) => {
  const { data } =
    props;

  return (
    <>
      <div className="w-full flex gap-2 mt-2 px-4 font-play">
        <div className="w-1/2 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
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
        <div className="w-1/2 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
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
              <label className="font-semibold">Hospital</label>
              <input
                type="text"
                value={data?.hospital}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SetDetails;
