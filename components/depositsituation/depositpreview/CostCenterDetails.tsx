import React from 'react';

interface Props {
  data: any;
}

const CostCenterDetails: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className="">
      <div className="border-2 rounded-xl border-blue-300">
        <div className="border-b-2 border-blue-600">
          <div className="p-2 text-center text-xl font-bold bg-blue-500 rounded-t-xl text-white">
            Cost Center
          </div>
        </div>
        <div className="px-4">
          <div className="p-2 font-semibold ">City:</div>
          <div className="p-2 bg-blue-100 rounded-lg m-2">{data?.City}</div>
        </div>
        <div className="px-4">
          <div className="p-2 font-semibold">Hospital:</div>
          <div className="p-2 bg-blue-100 rounded-lg m-2">{data?.Hospital}</div>
        </div>
        <div className="px-4">
          <div className="p-2 font-semibold">Clinic:</div>
          <div className="p-2 bg-blue-100 rounded-lg m-2">{data?.Clinic}</div>
        </div>
        <div className="px-4 pb-2">
          <div className="p-2 font-semibold">Operation Room:</div>
          <div className="p-2 bg-blue-100 rounded-lg m-2">
            {data?.OperationRoom}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostCenterDetails;
