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
      Header: 'Autoclave Code',
      accessor: 'AutoclaveNumber',
    },
    {
        Header: 'Autoclave Cycles',
        accessor: 'CyclesAutoclave',
    },
    {
        Header: 'Container Code',
        accessor: 'ContainerCode',
    },
    {
      Header: 'Exit Weight',
      accessor: 'ExitWeight',
   },
    {
        Header: 'Central of sterilization',
        accessor: 'CentralOfSterilization',
    },
    
    
  ];
const AutoclavesHistory: React.FC<Props> = (props: Props) => {
  const { data } =
    props;
    useEffect(() => {
        console.log(data)
      }, [data]);

  return (
    <>
       <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-4">
        <div className="flex w-full flex-col text-left text-xl font-bold pt-4 px-4">
          Autoclaves History
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
     
    </>
  );
};

export default AutoclavesHistory;
