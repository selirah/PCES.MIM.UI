import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import BaseTable from 'components/general/BaseTable';
import { ENV } from '../../env';

const ImportOrder = () => {
  const { isLoading, isError, data } = useQuery(
    'depositrequests',
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
      accessor: "SupplierId",
      Cell: ({ cell }: any) => {
        return (
          <div className="m-4">
            <Link
              href={{
                pathname:
                  ENV.NEXTAUTH_URL + '/importorder/revieworder/[supplierId]',
                query: {
                  supplierId: cell.value,
                },
              }}
              as="/importorder/revieworder/[supplierId]"
            >
              <button className="text-gray-100  bg-gradient-top-bottom font-play font-semibold p-2 rounded-md">
                Review Order
              </button>
            </Link>
          </div>
        );
      },
    },
  ];
  console.log(isLoading, isError, data);
  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <>
      <div>
        <div className="flex flex-col text-left text-lg font-semibold font-play pt-4 px-4 text-blue-navy">
          Suppliers
        </div>
        <BaseTable data={suppliers} columns={columns} />
      </div>
    </>
  );
};

export default ImportOrder;

const fetchSuppliers = async () => {
  const result = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier');
  return result;
};
