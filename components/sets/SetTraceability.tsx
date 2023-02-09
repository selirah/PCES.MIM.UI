import React, { useEffect, useState } from 'react';
import BaseTable from 'components/general/BaseTable';

interface Props {
  data: any;
}
const columns = [
  {
    Header: 'Date',
    accessor: 'Date',
    Cell: ({ cell }) => {
      return cell.row.original.Date
        ? cell.row.original.Date.substr(0, 16).replace('T', ' ')
        : 'N/A';
    },
  },
  {
    Header: 'Process Status',
    accessor: 'ProcessStatus',
  },
];
const SetTraceability: React.FC<Props> = ({ data }: Props) => {
  return (
    <>
      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-4">
        <div className="flex flex-col text-left pt-4 px-4 text-sm text-gray-600 font-bold">
          Set History
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
    </>
  );
};

export default SetTraceability;
