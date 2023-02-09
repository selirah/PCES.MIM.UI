import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import CostCenterPicker from 'components/PreparingForTransport/CostCenterPicker';
import { useQuery } from 'react-query';
import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../env';
import ValidatePasswordPopupProduction from 'components/validationManager/ValidatePasswordPopupProduction';
import { OpenValidateProduction } from 'types/user-managemnt';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Show, setShow] = useState<any>(false);

  const costCenterQuery = useQuery('costCenter', fetchCostCenters);
  const [cities, setCities] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [operationRooms, setOperationRooms] = useState<any[]>([]);

  const [selectedOperationRoom, setSelectedOperationRoom] = useState();
  const [transportTo, setTransportTo] = useState();

  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };

  const validatePasswordResult = async (isValid: boolean) => {
    if (isValid) {
      const toSubmit = {
        operationRoomId: parseInt(transportTo),
        sets: sets.map((set) => {
          return { setId: set.SetId, processId: set.ProcessId };
        }),
      };
      try {
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/transportPost',
          toSubmit
        );
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage('Something went wrong. Try again');
        setShowError(true);
      }
    }
  };

  const fetchSetsForTransport = async () => {
    try {
      var result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/getSetsForTransport`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const setsQuery = useQuery('fetchSets', fetchSetsForTransport, {});

  const [sets, setSets] = useState<any[]>([]);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    if (setsQuery.data != undefined) {
      console.log(setsQuery.data.data);
      setSets(setsQuery.data.data);
    }
  }, [setsQuery.data]);

  useEffect(() => {
    setsQuery.refetch();
  }, [selectedOperationRoom]);

  useEffect(() => {
    if (costCenterQuery.data != undefined) {
      setCities(costCenterQuery.data.data.cities);
      setHospitals(costCenterQuery.data.data.hospitals);
      setClinics(costCenterQuery.data.data.clinics);
      setOperationRooms(costCenterQuery.data.data.operationRooms);
    }
  }, [costCenterQuery.data]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'Name',
    },
    {
      Header: 'Description',
      accessor: 'Description',
    },
    {
      Header: 'Set Code',
      accessor: 'SetCode',
    },
    {
      Header: 'Status',
      accessor: 'ProcessStatusId',
      Cell: ({ cell }) => {
        return (
          <div className="">
            {cell.value == 14 ? (
              <div className="p-2 bg-green-500 text-white font-semibold rounded-md">
                Ready
              </div>
            ) : (
              <div className="p-2 bg-red-500 text-white font-semibold rounded-md">
                Print Documents
              </div>
            )}
          </div>
        );
      },
    },
  ];

  if (status === 'loading') {
    return <h1>'Loading...'</h1>;
  } else if (status === 'unauthenticated') {
    router.push('/auth/login');
  }

  return (
    // You can wrap your layout component arount this block
    <>
      <Head>
        <title>Transport</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="border-b-2 h-12">
        <div className="font-bold text-xl text-left ml-12 mt-4">Transport</div>
      </div>
      <div className="p-4">
        <div className="mb-8 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
            Sets for Transport
          </div>
          <BaseTable columns={columns} data={sets} />
        </div>
        <div className="">
          <button
            onClick={() => {
              setOpenValidate({ open: true });
            }}
            className="bg-blue-900 p-2 rounded-md text-white font-semibold w-full"
          >
            Transport
          </button>
          <ValidatePasswordPopupProduction
            validatePasswordResult={validatePasswordResult}
            openValidate={openValidate}
            onClose={handleOnClose}
          />
          {showError ? (
            <GeneralFailPopup
              setShow={setShowError}
              errorMessage="Something went wrong. Try again"
            />
          ) : (
            ''
          )}
          {showSuccess ? (
            <GeneralSuccessPopup
              successMessage={'Sets transported successfully'}
              buttonLink="/"
              buttonMessage={'Ok'}
              onClick={onClick}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
};

// export getStaticProps or getServerProps here - see example below - example retrieves menu items
// export const getStaticProps = async () => {
//   return {
//     props: {
//       // menuContent is an imported file/json response from server
//       menuItems: menuContent   // menuItems will be passed as props to Home component above at line 7
//     }
//   }
// }
const fetchCostCenters = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/costcentersfordropdown'
  );
};

export default Home;
