import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import { ENV } from '../../env';

interface Props {
  openStartUp: boolean;
  setOpenStartUp: any;
  toSubmit: any;
}
const SubmitStartup: React.FC<Props> = (props) => {
  const { openStartUp, setOpenStartUp, toSubmit } = props;

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

  const submitHandler = async () => {
    try {
      await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + `/Machine/startUp`, toSubmit);
      setShowSuccess(true);
      setSuccessMessage('Successfully Submit Start Up');
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  return openStartUp ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setOpenStartUp(false);
          }
        }}
      >
        <div className="rounded-md relative w-full h-56 max-w-screen-sm bg-blend-overlay bg-white">
          <div className="font-semibold text-center text-xl divide-y border-b-4 mt-6">
            <span>Save Start Up</span>
          </div>
          <div className="font-semibold text-gray-700 text-center mt-8">
            <span className="text-lg">
              Are you sure you want to save the start up?
            </span>
            <div className="flex gap-2 justify-center">
              <button
                onClick={submitHandler}
                className="bg-blue-900 p-2 w-1/2 rounded-md text-white font-semibold mt-4 ml-2"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setOpenStartUp(false);
                }}
                className="bg-blue-900 p-2 w-1/2 rounded-md text-white font-semibold mt-4 mr-2"
              >
                No
              </button>
            </div>
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
          successMessage={`Successfully Saved Startup`}
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

export default SubmitStartup;
