import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import { Params } from 'next/dist/server/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';
import MachineMaintenanceReportFilePopup from './MachineMaintenanceReportFilePopup';

interface Props {
  machineId: any;
}

const MachineMaintenanceHistory: React.FC<Props> = (props: Props) => {
  const { machineId } = props;
  const [machines, setMachines] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [maintenanceId, setMaintenanceId] = useState<number | undefined | null>(
    undefined
  );
  const machinesQuery = useQuery(
    ['fetchMachines', { setMachineId: machineId }],
    fetchMachines
  );

  useEffect(() => {
    if (machinesQuery.data != undefined) {
      setMachines(machinesQuery.data.data);
    }
  }, [machinesQuery.data]);

  const columns = useMemo(
    () => [
      {
        Header: 'Part Name',
        accessor: 'PartName',
      },
      {
        Header: 'Serial Number',
        accessor: 'SerialNumber',
      },

      {
        Header: 'Lot Number',
        accessor: 'LotNumber',
      },

      {
        Header: 'Date Of Replacement',
        accessor: 'DateOfReplacement',
        Cell: ({ cell }) => {
          return cell.row.original.DateOfReplacement
            ? cell.row.original.DateOfReplacement.slice(0, 10)
            : 'N/A';
        },
      },
      {
        Header: 'Reason For Replacement',
        accessor: 'ReasonForReplacement',
      },
      {
        Header: 'Maintenance Report',
        Cell: ({ cell }) => {
          return (
            <button
              className="pb-2 p-2 px-6 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              onClick={(e) => {
                setShow(true);
                setMaintenanceId(cell.row.original.MaintenanceReport);
              }}
            >
              Maintenance Report File
            </button>
          );
        },
      },
    ],
    [machines]
  );
  return (
    <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
      <div className="flex flex-col text-base font-bold pt-4 px-4">
        Machine Maintenance History
      </div>
      <BaseTable columns={columns} data={machines} />
      <MachineMaintenanceReportFilePopup
        setShow={setShow}
        show={show}
        maintenanceId={maintenanceId}
      />
    </div>
  );
};

const fetchMachines = async (params: Params) => {
  const [_, { setMachineId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/machine/machineMaintenanceHistory?machineId=${setMachineId}`
  );
  return result;
};

export default MachineMaintenanceHistory;
