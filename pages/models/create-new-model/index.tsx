import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModelForm from 'components/models/ModelForm';
import ModelProductTypes from 'components/models/ModelProductTypes';
import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { ENV } from '../../../env';

const CreateModel: React.FC = () => {
  const [submissionData, setSubmissionData] = useState<any>({});
  const [selectedProductTypes, setSelectedProductTypes] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data: session, status } = useSession();

  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (session != undefined) {
      setUserId(session.user.userDTO.userId);
    }
  }, [session]);


  const handleSubmit = async () => {
    const toSubmit = {...submissionData,productTypes:selectedProductTypes,userId:session.user.userDTO.userId};
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/insertSetModelWithProductTypes',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };
  return (
    <>
      <Head>
        <title>Create New Model</title>
      </Head>
      <div className='screen-background'>
      <div className="border-b-2 border-blue-700 h-12">
        <div className="font-bold text-xl text-left ml-12 text-gradient">
          Create New Model
        </div>
      </div>
      <div className="p-4">
        <ModelForm setData={setSubmissionData} />
        <div>
          <ModelProductTypes setData={setSelectedProductTypes} />
        </div>
        <button
          className="w-full h-12 mt-4 font-semibold text-white bg-gradient-button rounded-md"
          onClick={handleSubmit}
        >
          Create Model
        </button>
      </div>
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/'}
          buttonMessage={'Ok'}
          successMessage={'Successfully created model'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
      </div>
    </>
  );
};

export default CreateModel;
