import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BaseTable from 'components/general/BaseTable';
import RemoveSet from 'pages/sets/RemoveSet';

interface Props {
  data: any;
  redirectPath:string
}

const SetRequestsList: React.FC<Props> = ({ data ,redirectPath}: Props) => {
  const columns = [
    {
      Header: 'Set Code',
      accessor: 'setCode',
    },
    {
      Header: 'Set Name',
      accessor: 'nameEng',
    },
    {
      Header: 'Set Description',
      accessor: 'descriptionEng',
    },
    {
      Header: 'Status',
      accessor: 'setStatus.nameEng',
      Cell:({cell})=><span className="text-blue-dark-ocean font-play font-semibold">{cell.value}</span>
    },
    {
      accessor:"setId",
      Cell: ({ cell }: any) => {
        return (
          <>
            <div className="flex gap-1 justify-center mt-1">
              <div>
                <Link
                  href={{
                    pathname: `/${redirectPath}/[setId]`,
                    query: {
                      setId: cell.row.original.setId,
                    },
                  }}
                >
                  <button className="hover:opacity-100 opacity-90 flex-1 bg-blue-dark-ocean rounded-md text-white font-semibold p-4">
                    View Request
                  </button>
                </Link>
              </div>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col text-left text-lg font-bold pt-4 px-4 text-gradient font-play">
          ALL SET REQUESTS
        </div>
          <BaseTable data={data} columns={columns} />
      </div>
    </>
  );
};
export default SetRequestsList;
