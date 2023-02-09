import React, { useEffect, useState } from 'react';
import BaseTable from 'components/general/BaseTable';

interface Props {
  data: any
}
const columns = [
    {
      Header: 'LOT',
      accessor: 'SterilizationLot',
    },
    {
        Header: 'Tray Code',
        accessor: 'TrayCode',
    },
    {
        Header: 'Tray',
        accessor: 'WashedTray',
    },
    {
        Header: 'Machine',
        accessor: 'MachineCode',
    },
    {
        Header: 'Cycles',
        accessor: 'Cycles',
    },
    {
      Header: 'Date of cleaning',
      accessor: 'DateOfCleaning',
      Cell: ({ cell }) => {
        return cell.row.original.DateOfCleaning
          ? cell.row.original.DateOfCleaning.substr(0, 16).replace('T', ' ')
          : 'N/A';
      },
    },
    
    
  ];
const WashingHistory: React.FC<Props> = (props: Props) => {
  const { data } =
    props;
    useEffect(() => {
        console.log(data)
      }, [data]);

  return (
    <>
       <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-4">
        <div className="flex w-full flex-col text-left text-xl font-bold pt-4 px-4">
          Washing History
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
     
    </>
  );
};

export default WashingHistory;
