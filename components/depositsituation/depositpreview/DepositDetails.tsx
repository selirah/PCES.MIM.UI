import React from 'react';

interface Props {
  data: any;
}

const DepositDetails: React.FC<Props> = ({ data }: Props) => {
  return (
    <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
      <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
        Deposit Details
      </div>
      <div className="p-4">
        <div>
        <div className="mt-4">
            <label className="font-semibold">Code</label>
            <input
              value={data?.DepositCode}
              readOnly
              type="text"
              className="w-full rounded-md bg-gray-100"
            />
          </div>
          <div className="mt-4">
            <label className="font-semibold">Type</label>
            <input
              value={data?.Type}
              readOnly
              type="text"
              className="w-full rounded-md bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositDetails;
