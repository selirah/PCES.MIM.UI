import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BaseTable from 'components/general/BaseTable';
import RemoveModel from 'pages/models/all-models/RemoveModel';

interface Props {
  data: any;
}

const columns = [
  {
    Header: 'LOT',
    accessor: 'SterilizationLot',
  },
  {
    Header: 'City',
    accessor: 'CityOfIntervention',
  },
  {
    Header: 'Hospital',
    accessor: 'HospitalOfIntervention',
  },
  {
    Header: 'Clinic',
    accessor: 'ClinicOfIntervention',
  },
  {
    Header: 'Operation Room',
    accessor: 'OperationRoomOfIntervention',
  }
  
  
];
const SterilizationTraceability: React.FC<Props> = ({ data }: Props) => {
  return (
    <>
      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-4">
        <div className="flex w-full flex-col text-left text-xl font-bold pt-4 px-4">
          Sterilization History
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
      
    </>
  );
};

export default SterilizationTraceability;
