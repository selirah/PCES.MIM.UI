import React, { useEffect, useState } from 'react';

interface Props {
  data: any
}

const SetDetails: React.FC<Props> = (props: Props) => {
  const { data } =
    props;
    useEffect(() => {
        console.log(data)
      }, [data]);

  return (
    <>
      <div className="w-full flex gap-2 mt-2 px-4 font-play">
        <div className="w-1/2 flex flex-col mt-2 border-2 rounded-md shadow-md">
          <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
            Set Details
          </div>
          <div className="p-4">
            <div>
              <label className="font-semibold">Name</label>
              <input
                type="text"
                value={data[0]?.NameEng}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Description</label>
              <input
                type="text"
                value={data[0]?.DescriptionEng}
                readOnly
                className="w-full bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="font-semibold">Set Code</label>
              <input
                type="text"
                value={data[0]?.SetCode}
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
