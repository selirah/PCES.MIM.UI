import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SituationButton from './SituationButton';
import BaseTable from 'components/general/BaseTable';

interface Props {
  data: any;
}

const SituationTable: React.FC<Props> = ({ data }: Props) => {
  console.log(data);
  const columns = [
    {
      Header: 'Deposit Code',
      accessor: 'DepositCode',
    },
    {
      Header: 'Situation',
      Cell: ({ cell }: any) => {
        console.log(cell);
        return (
          <div className="flex">
            <SituationButton
              materials={cell.row.original.Subcategories.Hazardous}
              letter="H"
              depositId={cell.row.original.DepositId}
              subCategoryId={1}
            />
            <SituationButton
              materials={cell.row.original.Subcategories.ROT}
              letter="R"
              depositId={cell.row.original.DepositId}
              subCategoryId={2}
            />
            <SituationButton
              materials={cell.row.original.Subcategories.NWM}
              letter="N"
              depositId={cell.row.original.DepositId}
              subCategoryId={3}
            />
            <SituationButton
              materials={cell.row.original.Subcategories.Accessories}
              letter="A"
              depositId={cell.row.original.DepositId}
              subCategoryId={5}
            />
            <SituationButton
              materials={cell.row.original.Subcategories.Instruments}
              letter="I"
              depositId={cell.row.original.DepositId}
              subCategoryId={3006}
            />
          </div>
        );
      },
    },
    {
      Header: 'Details',
      Cell: ({ cell }: any) => {
        return (
          <div>
            <Link
              href={{
                pathname: `/depositsituation/depositpreview/[depositId]`,
                query: {
                  depositId: cell.row.original.DepositId,
                },
              }}
            >
              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                View Deposit
              </button>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="p-4">
      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
        <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
          Deposits
        </div>
        <BaseTable data={data} columns={columns} />
      </div>
    </div>
  );
};
export default SituationTable;
