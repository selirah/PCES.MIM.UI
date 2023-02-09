import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { OpenValidate } from 'types/user-managemnt';
import { ENV } from '../../env';

const AcceptanceList: React.FC = () => {
  const [acceptance, setAcceptance] = useState<any[]>([]);

  const acceptanceQuery = useQuery('fetchAcceptance', fetchAcceptance);


  useEffect(() => {
    if (acceptanceQuery.data != undefined) {
      setAcceptance(acceptanceQuery.data.data);
    }
  }, [acceptanceQuery.data]);

  //   const data = useMemo(() => machines, [setMachines]);
  const columns = useMemo(
    () => [
      {
        Header: 'Set Code',
        accessor: 'SetCode',
      },
      {
        Header: 'Model',
        accessor: 'NameEng',
      },
      {
        Header: 'Description Eng',
        accessor: 'DescriptionEng',
      },

      {
        Header: 'Acceptance Date',
        Cell: ({ cell }: any) => {
            return cell.row.original.CreationDate.replace("T"," ")
          },
      },
    ],

    [acceptance]
  );

  return (
    <>
      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable columns={columns} data={acceptance} />
     </div>
    </>
  );
};

const fetchAcceptance = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/process/getListOfAcceptance'
  );
};

export default AcceptanceList;
