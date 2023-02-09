import { Params } from 'next/dist/server/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import { ENV } from '../../env';

interface Props {
  machineId: any;
}

const MachineSetupHistory: React.FC<Props> = (props: Props) => {
  const { machineId } = props;
  const [machines, setMachines] = useState<any[]>([]);

  const [columns, setColumns] = useState<any[]>([]);

  const machinesQuery = useQuery(
    ['fetchMachines', { setMachineId: machineId }],
    fetchMachines, {enabled:machineId!==undefined,refetchOnWindowFocus:false}
  );
  
  useEffect(() => {
    if (machinesQuery.data != undefined) {
      setMachines(machinesQuery.data.data);
    }
  }, [machinesQuery.data]);
  useEffect(() => {
    if (machines != undefined && machines.length > 0) {
      switch (machines[0].MachineTypeId) {
        case 1005: //lowTemp
          setColumns([
            {
              Header: 'Test Bio',
              accessor: 'TestBio',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate1',
            },

            {
              Header: 'Vacuum Test',
              accessor: 'VacuumTest',
            },
            {
              Header: 'BD/HT',
              accessor: 'BDHT',
            },

            {
              Header: 'Cycle',
              accessor: 'Cycle',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate2',
            },
          ]);
          break;
        case 1002: //autoclaves
          setColumns([
            {
              Header: 'Test Bio',
              accessor: 'TestBio',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate1',
            },

            {
              Header: 'Vacuum Test',
              accessor: 'VacuumTest',
            },
            {
              Header: 'BD/HT',
              accessor: 'BDHT',
            },

            {
              Header: 'Cycle',
              accessor: 'Cycle',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate2',
            },
          ]);
          break;
        case 1003: //higienio
          setColumns([
            {
              Header: 'Dezinfectant',
              accessor: 'Dezinfectant',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate1',
            },

            {
              Header: 'Lot Number',
              accessor: 'LotNumber1',
            },
          ]);
          break;
        case 2: //ultrasound
          setColumns([
            {
              Header: 'Detergent',
              accessor: 'Detergent',
            },

            {
              Header: 'Lot Number',
              accessor: 'LotNumber1',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate1',
            },
          ]);
          break;
        case 1004: //thermodesinfector
          setColumns([
            {
              Header: 'Neutralizing',
              accessor: 'Neutralizing',
            },
            {
              Header: 'LotNumber',
              accessor: 'LotNumber1',
            },
            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate1',
            },

            {
              Header: 'Detergent',
              accessor: 'Detergent',
            },

            {
              Header: 'LotNumber',
              accessor: 'LotNumber2',
            },

            {
              Header: 'Expiry Date',
              accessor: 'ExpiryDate2',
            },
          ]);
          break;
        
      }
    }
  }, [machines]);

  return (
    <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
      <div className="flex flex-col text-base font-bold pt-4 px-4">
        Machine Start-Up History
      </div>

      <BaseTable columns={columns} data={machines} />
    </div>
  );
};

const fetchMachines = async (params: Params) => {
  const [_, { setMachineId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/machine/startUpsByMachineId?machineId=${setMachineId}`
  );
  //console.log(result);
  return result;
};

export default MachineSetupHistory;
