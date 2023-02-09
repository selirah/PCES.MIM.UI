import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CostCenterPicker from './CostCenterPicker';
import { getSession } from 'next-auth/react';

import { ENV } from '../../env';
import SetDetails from './SetDetails';
import ValidatePasswordPopupProduction from 'components/validationManager/ValidatePasswordPopupProduction';
import { OpenValidateProduction } from 'types/user-managemnt';

const PreparingForTransport: React.FC = () => {
  const [barcode, setBarcode] = useState<any>();

  const { isLoading, data, refetch } = useQuery(
    ['fetchSetForTransport', { barcode: barcode }],
    fetchSetForTransport,
    { refetchOnWindowFocus: false, enabled: false }
  );

  const [operationRoomId, setOperationRoomId] = useState<number>();
  const [transportTo, setTransportTo] = useState();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSuccessStepBack, setShowSuccessStepBack] =
    useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [specialUser, setSpecialUser] = useState<boolean>();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const [setData, setSetData] = useState<any>();
  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const validatePasswordResult = async (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      const toSubmit = {
        setId: setData.SetId,
        processId: setData.ProcessId,
      };
      try {
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/PrepareForTransport`,
          toSubmit
        );
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage('Something went wrong. Try again');
        setShowError(true);
      }
    }
  };

  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };
  useEffect(() => {
    getSession().then((session) => {
      setSpecialUser(session?.user.userDTO.specialUser);
    });
  }, [router]);

  useEffect(() => {
    setSetData(data?.data);
  }, [data]);

  const onSubmitBarcode = () => {
    refetch();
  };

  const handleSubmitStepBack = async () => {
    const toSubmit = {
      setId: setData.SetId,
      processId: setData.ProcessId,
    };
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/GoBackFromTransport`,
        toSubmit
      );
      setShowSuccessStepBack(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const generateBarcode = async () => {
    if (setData?.ProcessId == undefined) {
      setErrorMessage('Invalid Set');
      setShowError(true);
      return;
    }
    try {
      var result = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Report/barcode?barcode=${setData.LotNumber}`,
        {},
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `${setData.LotNumber}.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const downloadScedaForm = async () => {
    if (setData?.ProcessId == undefined) {
      setErrorMessage('Invalid Set');
      setShowError(true);
      return;
    }
    try {
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Report/scedaForm?setId=${setData.SetId}`,
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `ScedaSkit.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const downloadInterventionForm = async () => {
    if (setData?.ProcessId == undefined) {
      setErrorMessage('Invalid Set');
      setShowError(true);
      return;
    }
    try {
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Report/InterventionForm?setId=${setData.SetId}`,
        { responseType: 'blob' }
      );
      let a = document.createElement('a');
      a.href = window.URL.createObjectURL(result.data);
      a.download = `InterventionForm.pdf`;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/');
  };

  const onClickBack = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/autoclaves');
  };
  return (
    <>
      <BarcodeSearch
        isLoading={isLoading}
        setBarcode={setBarcode}
        onSubmitBarcode={onSubmitBarcode}
      />
      <SetDetails data={setData} />

      <div className="flex gap-4 mt-4 p-3 font-play font-semibold">
        <button
          onClick={() => {
            downloadScedaForm();
          }}
          className="p-2 bg-gradient-top-bottom from-blue-900 to-blue-700 text-white rounded-md w-full ont-play font-semibold"
        >
          Skeda kit
        </button>

        <button
          className="p-2 bg-gradient-top-bottom from-blue-900 to-blue-700 text-white rounded-md w-full ont-play font-semibold"
          onClick={generateBarcode}
        >
          Generate Lot Number
        </button>
        <button
          className="p-2 bg-gradient-top-bottom from-blue-900 to-blue-700 text-white rounded-md w-full ont-play font-semibold"
          onClick={downloadInterventionForm}
        >
          Generate Intervention Form
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={!specialUser}
          className="p-2 bg-gradient-top-bottom from-green-700 to-green-500 font-play text-white rounded-md mt-8 w-full font-semibold disabled:cursor-not-allowed"
          onClick={handleSubmitStepBack}
        >
          Go Back
        </button>
        <button
          className="p-2 bg-gradient-top-bottom font-play text-white rounded-md mt-8 w-full font-semibold"
          onClick={() => {
            setOpenValidate({ open: true });
          }}
        >
          Submit
        </button>
      </div>
      <ValidatePasswordPopupProduction
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/'}
          buttonMessage={'OK'}
          successMessage="Set transported"
          onClick={onClick}
        />
      ) : (
        ''
      )}
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : (
        ''
      )}
      {showSuccessStepBack ? (
        <GeneralSuccessPopup
          buttonLink={'/autoclaves'}
          buttonMessage={'Go To Autoclaves'}
          successMessage="Set returned back to autoclaves"
          onClick={onClickBack}
        />
      ) : (
        ''
      )}
    </>
  );
};

interface Props {
  queryKey: any;
}

const fetchSetForTransport = async (props: Props) => {
  const [_, { barcode }] = props.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Set/simplifiedSetDetailsByBarcode?setBarcode=${barcode}`
  );
  return result;
};

const fetchCostCenters = async () => {
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/costcentersfordropdown'
  );
  return result;
};

export default PreparingForTransport;
