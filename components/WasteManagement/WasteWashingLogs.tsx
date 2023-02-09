import React, { useEffect, useState } from 'react';
import BaseTable from 'components/general/BaseTable';
import Link from 'next/link';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import { useRouter } from 'next/router';
import { OpenValidate } from 'types/user-managemnt';
import axios from 'axios';
import { ENV } from 'env';

interface Props {
  data: any;
}

const WasteWashingLogs: React.FC<Props> = ({ data }: Props) => {
  const [openValidate, setOpenValidate] = useState<OpenValidate>({
    open: false,
    action: '',
  });

  const router = useRouter();

  const downloadLogs = async () => {
    try {
      const result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Report/wastewashreport`,
        null,
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `WasteWashingLogs.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    {
        Header: 'Accessory Name',
        accessor: 'AccessoryName',
    },  
    {
      Header: 'Product Code',
      accessor: 'ProductCode',
    },
    {
      Header: 'Date',
      Cell: ({ cell }: any) => {
        return cell.row.original.Date ? cell.row.original.Date.slice(0,10) : 'N/A';
      }
    },
    {
      Header: 'Washing Type',
      accessor: 'WashingType',
    },
    {
      Header: 'User',
      accessor: 'Username',
    }
  ];

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col text-left text-xl font-bold pt-4 px-4">
          Logs
        </div>
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable data={data} columns={columns} />
        </div>
        <div>
            <div className="px-16">
              <button
                onClick={() => {
                  downloadLogs();
                }}
                className="w-full font-semibold p-4 rounded-md bg-blue-900 text-white mb-4"
              >
                Download Logs
              </button>
            </div>
          </div>
      </div>
    </>
  );
};
export default WasteWashingLogs;
