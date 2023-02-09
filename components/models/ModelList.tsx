import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import BaseTable from 'components/general/BaseTable';
import RemoveModel from 'pages/models/all-models/RemoveModel';

interface Props {
  data: any;
}

const ModelList: React.FC<Props> = ({ data }: Props) => {
  const [setModelId, setSetModelId] = useState<number>();
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const columns = [
    {
      Header: 'Model Code',
      accessor: 'modelCode',
    },
    {
      Header: 'Model Name',
      accessor: 'nameEng',
    },
    {
      Header: 'Model Description',
      accessor: 'descriptionEng',
    },
    {
      Header: ' ',
      Cell: ({ cell }: any) => {
        return (
          <>
            <div className="flex gap-1 justify-center mt-1">
              <div>
                <Link
                  href={{
                    pathname: `/models/all-models/edit-model/[modelId]`,
                    query: {
                      modelId: cell.row.original.setModelId,
                    },
                  }}
                >
                  <button className="hover:scale-110 flex-1 bg-blue-500 rounded-md text-white font-semibold p-4">
                    Duplicate
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  href={{
                    pathname: `/models/all-models/model-revision/[modelId]`,
                    query: {
                      modelId: cell.row.original.setModelId,
                    },
                  }}
                >
                  <button className="hover:scale-110 flex-1 bg-yellow-500 rounded-md text-white font-semibold p-4">
                    Revision
                  </button>
                </Link>
              </div>
              <div>
                <Link
                  href={{
                    pathname: `/models/all-models/model-preview/[modelId]`,
                    query: {
                      modelId: cell.row.original.setModelId,
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
                    setSetModelId(cell.row.original.setModelId);
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
        <div className="flex flex-col text-left text-xl font-bold pt-4 px-4">
          Models
        </div>
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable data={data} columns={columns} />
        </div>
      </div>
      <RemoveModel
        setModelId={setModelId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
    </>
  );
};

export default ModelList;
