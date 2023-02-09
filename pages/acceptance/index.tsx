import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import AppLayout from 'components/AppLayout';
import { QueryClient, QueryClientProvider } from 'react-query';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import axios from 'axios';
import InterventionDetails from 'components/acceptance-screens/InterventionDetails';
import SetDetails from 'components/PreparingForTransport/SetDetails';
import ConsumableList from 'components/acceptance-screens/ConsumableList';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../env';
import { Switch } from '@headlessui/react';
import SetList from 'components/sets/SetList';
import IrregularAcceptance from 'components/acceptance-screens/IrregularAcceptance';
import BaseTable from 'components/general/BaseTable';
import { OpenValidateProduction } from 'types/user-managemnt';
import ValidatePasswordPopupProduction from 'components/validationManager/ValidatePasswordPopupProduction';

const queryClient = new QueryClient();

type Barcode = string;

const Home = () => {
  const router = useRouter();
  const [_, setAppSession] = useState<Session>();
  const [__, setLoader] = useState(false);
  const [barcode, setBarcode] = useState<Barcode>();
  const [interventionDetails, setInterventionDetails] = useState<any>();
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<any>();
  const [setDetails, setSetDetails] = useState<any>({});
  const [products, setProducts] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');

  const [setList, setSetList] = useState<any[]>([]);

  const [costCenterDetails, setCostCenterDetails] = useState<any>();

  const [error, setError] = useState<string>('');

  const [toggle, setToggle] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };

  const validatePasswordResult = async (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      setError('');
      if (toggle) {
        const toSubmit = {
          setList,
          notes,
          userId: session.user.userDTO.userId,
        };
        try {
          await axios.post(
            `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/irregularAcceptancePost`,
            toSubmit
          );
          setShowSuccess(true);
        } catch (error) {
          setError(error.response.data);
        }
        return;
      }
      const toSubmit = {
        intervention: { ...interventionDetails },
        sets: setList,
        products: products,
        userId: session.user.userDTO.userId,
      };
      try {
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/acceptancePost',
          toSubmit
        );
        setShowSuccess(true);
      } catch (error) {
        setShowError(true);
      }
    }
  };

  const columns = [
    {
      Header: 'Set Code',
      accessor: 'SetCode',
    },
    {
      Header: 'Set Name',
      accessor: 'SetName',
    },
    {
      Header: 'Set Description',
      accessor: 'SetDescription',
    },
    {
      accessor: 'SetId',
      Cell: ({ cell }) => (
        <button
          className="bg-red-500 rounded-md text-white font-play font-semibold p-2 px-4 m-1"
          onClick={() => removeSet(cell.value)}
        >
          x
        </button>
      ),
    },
  ];

  const removeSet = (setId: number) => {
    setSetList(
      setList.filter((set) => {
        set.SetId != setId;
      })
    );
  };

  const onSubmitBarcode = async () => {
    setError('');

    if (
      barcode.length < 3 ||
      (!barcode.toLowerCase().startsWith('st') &&
        !barcode.toLowerCase().startsWith('pr') &&
        !barcode.toLowerCase().startsWith('cc'))
    ) {
      setError('Invalid barcode format');
      return;
    }

    try {
      const response = await axios.get(
        `${
          ENV.NEXT_PUBLIC_API_ENDPOINT
        }/Process/acceptanceScan?barcode=${barcode}&depositId=${
          costCenterDetails && costCenterDetails.DepositId
            ? costCenterDetails.DepositId
            : ''
        }`
      );
      console.log(response);

      const details = response.data;

      if (details.SetId != null) {
        setSetList([...setList, details]);
      } else if (details.City != null) {
        setCostCenterDetails(details);
      } else {
        setProducts([...products, details]);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(error.response.data.toString());
    }
  };

  useEffect(() => {
    setLoader(true);
    getSession().then((session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setLoader(false);
        setAppSession(session);
      }
    });
  }, [router]);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/sets/sets-opening');
  };
  return (
    // You can wrap your layout component arount this block
    <>
      <Head>
        <title>Acceptance</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${!toggle ? '' : 'h-full'} screen-background`}>
        <div className="border-b-2 h-12">
          <div className="font-semibold font-play text-xl text-left p-2 text-gradient">
            ACCEPTANCE
          </div>
        </div>
        <div className="w-full flex flex-col mt-2 px-4 py-4">
          <div className="w-full flex flex-col px-4 py-4">
            {error != '' ? (
              <span className="font-semibold font-play text-red-600">
                {error}
              </span>
            ) : null}
            <BarcodeSearch
              setBarcode={setBarcode}
              isLoading={isLoading}
              onSubmitBarcode={onSubmitBarcode}
            />
          </div>

          <div className="flex">
            <Switch
              checked={toggle}
              onChange={setToggle}
              className={`${
                toggle
                  ? 'bg-gradient-to-r from-blue-dark-ocean to-blue-navy'
                  : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  toggle ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
            <div className="mx-4">
              <span className="text-blue-navy font-play font-semibold">
                {!toggle ? 'Regular Sterilization' : 'Irregular Sterilizaiton'}
              </span>
            </div>
          </div>
        </div>

        {!toggle ? (
          <div className="p-2">
            <div className="w-full flex flex-col shadow-md rounded-md mt-4 border-blue-navy border-t-4">
              <div className="flex flex-col text-base font-bold pt-4 px-4">
                Intervention Details
              </div>
              <InterventionDetails
                setFile={setFile}
                file={file}
                setInterventionDetails={setInterventionDetails}
                city={costCenterDetails?.City}
                hospital={costCenterDetails?.Hospital}
                clinic={costCenterDetails?.Clinic}
                operationRoom={costCenterDetails?.OperationRoom}
              />
            </div>
            <div className="w-full flex flex-col mt-2">
              <div className="w-full flex  shadow-md rounded-md border-t-4 border-blue-navy">
                <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-2 m-2 mt-4">
                  <div className="flex flex-col text-base font-bold pt-4 px-4 ">
                    Set List
                  </div>
                  <BaseTable columns={columns} data={setList} />
                </div>
                <ConsumableList products={products} setProducts={setProducts} />
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <IrregularAcceptance
              data={setList}
              setNotes={setNotes}
              notes={notes}
              setData={setSetList}
              columns={columns}
            />
          </div>
        )}
        <div className="w-full flex flex-col mt-2 px-4 py-4">
          <button
            onClick={() => {
              setOpenValidate({ open: true });
            }}
            className="w-full rounded-md flex flex-row justify-center items-center bg-gradient-top-bottom py-2 text-white  font-semibold font-play"
          >
            <span>Submit</span>
          </button>
        </div>
      </div>
      <ValidatePasswordPopupProduction
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
      {showError ? (
        <GeneralFailPopup
          setShow={setShowError}
          errorMessage={'Something went wrong. Try again'}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/sets/sets-opening'}
          buttonMessage="Go To Set Opening"
          successMessage={'Items have been accepted'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Home;
