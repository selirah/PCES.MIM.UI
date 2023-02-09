import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { OpenValidate } from 'types/user-managemnt';
import MaintenancePopup from './MaintenancePopup';
import { ENV } from '../../env';

const MachineMaintenanceList: React.FC = () => {
  const [machines, setMachines] = useState<any[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [machineId, setMachineId] = useState<number>();

  const machinesQuery = useQuery('fetchMachines', fetchMachines);
  const [openValidate, setOpenValidate] = useState<OpenValidate>({
    open: false,
    action: '',
  });
  const handleOnClose = () => {
    setOpenValidate({ open: false, action: '' });
  }

  const validatePasswordResult = (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      switch (openValidate?.action) {
        case 'edit':
          setShow(true);
          break;
        default: {
        }
      }
    }
  };

  useEffect(() => {
    if (machinesQuery.data != undefined) {
      setMachines(machinesQuery.data.data);
    }
  }, [machinesQuery.data]);

  //   const data = useMemo(() => machines, [setMachines]);
  const columns = useMemo(
    () => [
      {
        Header: 'Machine Type',
        accessor: 'Machine Type',
      },
      {
        Header: 'Machine Name',
        accessor: 'Machine Name',
      },
      {
        Header: 'Cycles Limit',
        accessor: 'Cycles Limit',
      },

      {
        Header: 'Machine Code',
        accessor: 'Machine Code',
      },

      {
        Header: 'Cycles',
        accessor: 'Cycles',
      },
      {
        Header: 'Actions',
        accessor: 'MachineId',
        Cell: ({ cell }: any) => {
          // console.log(cell);
          return (
            <div className="w-full grid grid-cols-2 gap-2">
              <Link
                href={{
                  pathname: `/machineMaintenance/[machineId]`,
                  query: {
                    machineId: cell.value,
                  },
                }}
              >
                <a className="w-full p-2 flex flex-col col-span-1 row-span-1 shadow-md bg-blue-500 font-semibold text-white rounded-md no-underline hover:bg-blue-600 justify-center items-center">
                  History of Maintenance
                </a>
              </Link>

              <button
                onClick={() => {
                  setMachineId(cell.value);
                  setOpenValidate({ open: true, action: 'edit' });
                }}
                className="w-full p-2 flex flex-col col-span-1 row-span-1 shadow-md rounded-md bg-yellow-500 font-semibold text-sm text-white  justify-center items-center hover:bg-yellow-600"
              >
                Maintenance
              </button>
            </div>
          );
        },
      },
    ],

    [machines]
  );

  return (
    <>
      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
        <div className="flex flex-col text-base font-bold pt-4 px-4">
          Machines
        </div>
        <BaseTable columns={columns} data={machines} />
        <MaintenancePopup machineId={machineId} show={show} setShow={setShow} />
      </div>
      <ValidatePasswordPopup
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
    </>
  );
};

const fetchMachines = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/machine/machinesForMaintenance'
  );
};

export default MachineMaintenanceList;
