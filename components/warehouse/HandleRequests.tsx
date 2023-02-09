import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Link from 'next/link';
import BaseTable from 'components/general/BaseTable';
import { ENV } from '../../env';

const HandleRequests = () => {
  const { isLoading, isError, data } = useQuery(
    'depositrequests',
    fetchRequests
  );

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (data != undefined) {
      console.log(data.data);
      setRequests(data.data);
    }
  }, [data]);

  const columns = [
    {
      Header: 'Deposit Type',
      accessor: 'Type',
    },
    {
      Header: 'Deposit Code',
      accessor: 'DepositCode',
    },
    {
      Header: 'Date',
      Cell: ({ cell }: any) => {
        return cell.row.original.Requests ? cell.row.original.Requests.map((element: any) => {
          return (
            <div className="flex m-2 justify-between border-b-2 pb-2">
              <div className="p-2">               
                  <span>{element.CreationDate.slice(0, 10)}</span>               
              </div>
            </div>
          );
        }) : <div></div>;
      }
    },
    {
      Header: 'Requests',
      Cell: ({ cell }: any) => {
        return cell.row.original.Requests ? cell.row.original.Requests.map((element: any) => {
          return (
            <div className="flex m-2 justify-between border-b-2 pb-2">
              <div className="p-2 hover:text-blue-400 hover:cursor-pointer ">
                <Link
                  href={{
                    pathname: '/handlerequests/reviewrequest/[requestId]',
                    query: {
                      requestId: element.ProcessId,
                    },
                  }}
                >
                  <a>Request #{element.ProcessId}</a>
                </Link>
              </div>
            </div>
          );
        }) : <div></div>;
      }
    },
  ];

  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <div className="">
      <div className="flex flex-col text-left text-lg pt-4 px-4 font-semibold font-play">
        Active Requests
      </div>
      <BaseTable data={requests} columns={columns} />
    </div>
  );
};

export default HandleRequests;

// const handleCompletion = (requestId: string) => {
//   console.log('POST METHOD TO COMPLETE THE PROCESS');
// };

const fetchRequests = async () => {
  const result = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/requests');
  return result;
};
