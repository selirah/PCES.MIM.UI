import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import BaseTable from 'components/general/BaseTable';
import { ENV } from '../../env';

const Inventory = () => {
  const { isLoading, isError, data } = useQuery('deposits', fetchDeposits);

  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    if (data != undefined) {
      setDeposits(data.data);
    }
  }, [data]);

  const columns = [
    {
      Header: 'DepositCode',
      accessor: 'DepositCode',
    },
    {
      Header: 'City',
      accessor: 'City',
    },
    {
      Header: 'Hospital',
      accessor: 'Hospital',
    },
    {
      Header: 'Clinic',
      accessor: 'Clinic',
    },
    {
      Header: 'Block',
      accessor: 'Block',
    },
    {
      Header: 'Inventory',
      accesor: 'DepositId',
      Cell: ({ cell }: any) => {
        return (
          <>
            <div className="flex gap-1 justify-center mt-1">
              <div>
                <Link
                  href={{
                    pathname: `/inventory/inventoryDetails/[DepositId]`,
                    query: {
                      DepositId: cell.row.original.DepositId,
                    },
                  }}
                  as="/inventory/inventoryDetails/[depositId]"
                >
                  <button className="hover:scale-110 flex-1 bg-blue-900 rounded-md text-white font-semibold p-3">
                    Check Inventory
                  </button>
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <div className=" m-4 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
      <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
        Deposits
      </div>
      <BaseTable data={deposits} columns={columns} />
    </div>
  );
};

export default Inventory;

const fetchDeposits = async () => {
  const result = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit');
  return result;
};
