import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import { ENV } from '../../../env';

interface Props {
  openDelete: boolean;
  setOpenDelete: any;
  setModelId: number | undefined;
}
const RemoveModel: React.FC<Props> = (props) => {
  const { openDelete, setOpenDelete, setModelId } = props;

  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/SetModel/deactivateModelById?setModelId=${setModelId}`
      );
      setSuccessMessage('Successfully Removed Model');
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return openDelete ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setOpenDelete(false);
          }
        }}
      >
        <div className="rounded-md relative w-full h-56 max-w-screen-sm bg-blend-overlay bg-white">
          <div className="font-semibold text-center text-xl divide-y border-b-4 mt-6">
            <span>Remove Model</span>
          </div>
          <div className="font-semibold text-gray-700 text-center mt-8">
            <span className="text-lg">
              Are you sure you want to remove this model?
            </span>
            <button
              onClick={deleteHandler}
              className="bg-blue-900 p-2 w-2/3 rounded-md text-white font-semibold mt-4"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>

      {showError ? (
        <GeneralFailPopup
          errorMessage="Something went wrong. Try again"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage={`Successfully Removed Model`}
          buttonLink={'/'}
          buttonMessage={'Ok'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  ) : (
    <></>
  );
};

export default RemoveModel;
