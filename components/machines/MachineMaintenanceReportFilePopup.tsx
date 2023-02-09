import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from 'env';

interface Props {
  setShow: (data: boolean) => void;
  show: boolean;
  maintenanceId: number;
}

const MaintenanceReportFilePopup: React.FC<Props> = ({
  setShow,
  show,
  maintenanceId,
}: Props) => {
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string>('');


  useEffect(() => {
    if (maintenanceId) {
      try {
        axios.post(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/File/download`, { objectId: maintenanceId }).then((result) => {
          setFileName(result.data)
        })
      } catch (error) {
        setError(JSON.stringify(error))
      }
    }
  }, [maintenanceId]);



  useEffect(() => {
    console.log(fileName);
  }, [fileName]);

  return show ? (
    <div
      className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
      onClick={(event: any) => {
        if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
          setShow(false);
        }
      }}
    >
      <div className="rounded-md relative w-full h-auto max-w-screen-sm bg-blend-overlay bg-white">
        <div className="w-full border-b-2 font-semibold text-lg flex justify-between">
          <span className="p-4">Maintenance Report File</span>
          <button
            className="mr-4 text-2xl -mt-8 hover:scale-125 hover:text-red-600"
            onClick={() => {
              setShow(false);
            }}
          >
            x
          </button>
        </div>
        <div className="p-4 text-center font-play">
          {error !== '' ? (
            <div className="bg-red-300 text-black">{error}</div>
          ) : null}
          {fileName && fileName != '' ? <img src={`data:image/jpeg;base64,${fileName}`} /> : null}
        </div>
      </div>
    </div>
  ) : null;
};

export default MaintenanceReportFilePopup;
