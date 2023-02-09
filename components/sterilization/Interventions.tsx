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
        Header: 'Intervention Type',
        accessor: 'TypeOfIntervention',
    },
    {
        Header: 'Interevention Code',
        accessor: 'InterventionCode',
    },
    {
      Header: 'Date Of Intervention',
      accessor: 'DateOfIntervention',
      Cell: ({ cell }) => {
        return cell.row.original.DateOfIntervention
          ? cell.row.original.DateOfIntervention.substr(0, 16).replace('T', ' ')
          : 'N/A';
      },
    }
   ];
const Interventions: React.FC<Props> = (props: Props) => {
  const { data } =
    props;
    useEffect(() => {
        console.log(data)
      }, [data]);

  return (
    <>
       <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-4">
        <div className="flex w-full flex-col text-left text-xl font-bold pt-4 px-4">
          Interventions History
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
     
    </>
  );
};

export default Interventions;
