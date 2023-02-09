import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BaseTable from 'components/general/BaseTable';
import RemoveSet from 'pages/sets/RemoveSet';

interface Props {
  data: any;
}

const SetList: React.FC<Props> = ({ data }: Props) => {
  const [setId, setSetId] = useState<number>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);
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
                    pathname: `/sets/sets-preview/[setId]`,
                    query: {
                      setId: cell.row.original.setId,
                    },
                  }}
                >
                  <button className="hover:scale-110 flex-1 bg-gray-500 rounded-md text-white font-semibold p-4">
                    Preview
                  </button>
                </Link>
              </div>
              <div>
                <button
                  onClick={() => {
                    setSetId(cell.row.original.setId);
                    setOpenDelete(true);
                  }}
                  className="hover:scale-110 flex-1 bg-red-500 rounded-md text-white font-semibold p-4"
                >
                  x
                </button>
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
          ALL SETS
        </div>
          <BaseTable data={data} columns={columns} />
      </div>
      <RemoveSet
        setId={setId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </>
  );
};
export default SetList;
