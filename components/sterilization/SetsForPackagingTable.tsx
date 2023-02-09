import BaseTable from 'components/general/BaseTable';
import { Set } from 'interfaces/Sets';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface WashedSets {
  setDetails?: Set[];
}

const SetsForPackagingTable: React.FC<WashedSets> = (props) => {
  const { setDetails } = props;
  const setsList = setDetails && setDetails !== undefined ? setDetails : [];

  const data = useMemo(() => setsList, [setDetails]);
  const columns = useMemo(
    () => [
      {
        Header: 'Cost Center',
        accessor: 'Cost Center',
      },

      {
        Header: 'Code',
        accessor: 'SetCode'
      },
      {
        Header: 'Description',
        accessor: 'SetDescription',
      },

      {
        accessor: 'SetId',
        Cell: ({ cell }: any) => {
          return (
            <div className="p-2">
              <Link
                href={{
                  pathname: `/sets/sets-packaging/[setId]`,
                  query: {
                    setId: "ST" + cell.row.original.SetCode,
                  },
                }}
              >
                <a className=" justify-center p-1 rounded-md bg-blue-900 text-white text-sm font-bold ring ring-blue-800 disabled:opacity-50 disabled:pointer-events-none no-underline ">
                  {/* flex flex-row items-center px-4 py-2 rounded-md bg-blue-900 text-white text-sm font-bold ring ring-blue-800 hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none */}
                  Packaging
                </a>
              </Link>
            </div>
          );
        },
      },
    ],
    [setDetails]
  );
  return (
    <div className="w-full flex flex-col  shadow-md rounded-md border-blue-800 border-t-4 overflow-auto">
      <div className="flex flex-col text-base font-bold pt-2 px-4">Sets</div>
      <BaseTable columns={columns} data={data} />
    </div>
  );
};

export default SetsForPackagingTable;
