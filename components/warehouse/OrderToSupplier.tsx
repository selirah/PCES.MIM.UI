import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import BaseTable from 'components/general/BaseTable';
import { ENV } from '../../env';

const OrderToSupplier = () => {
  const { isLoading, isError, data } = useQuery(
    'fetchsuppliers',
    fetchSuppliers
  );

  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    if (data != undefined) {
      setSuppliers(data.data);
    }
  }, [data]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    },
    {
      Header: 'Address',
      accessor: 'Address',
    },
    {
      Header: 'Email',
      accessor: 'Email',
    },
    {
      Header: 'Account Number',
      accessor: 'AccountNumber',
    },
    {
      Header: 'Details',
      accessor: 'SupplierId',
      Cell: ({ cell }: any) => {
        return (
          <Link
            href={{
              pathname: '/ordertosupplier/supplierdetails/[supplierId]',
              query: {
                supplierId: cell.row.original.SupplierId,
              },
            }}
            as="/ordertosupplier/supplierdetails/[supplierId]"
          >
            <button className="">
              <div className="border-2 text-white bg-blue-dark-ocean rounded-md p-2 m-2 hover:bg-blue-800">
                View
              </div>
            </button>
          </Link>
        );
      },
    },
  ];

  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <div className="m-16 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
      <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
        Suppliers
      </div>
      <BaseTable data={suppliers} columns={columns} />
    </div>
  );
};

export default OrderToSupplier;

// const handleCompletion = (requestId: string) => {
//   console.log('POST METHOD TO COMPLETE THE PROCESS');
// };

const fetchSuppliers = async () => {
  const result = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier');
  return result;
};
