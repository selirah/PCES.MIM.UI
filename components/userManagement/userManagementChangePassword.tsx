import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  openPassword: boolean;
  setOpenPassword: any;
  userId: number | undefined;
}

const UserManagementChangePassword: React.FC<Props> = (props) => {
  const { openPassword, setOpenPassword, userId } = props;

  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [Show, setShow] = useState<any>(false);
  const submit = async () => {
    const toSubmit = {
      userId,
      password,
    };
    try {
      setSuccessMessage('Successfully changed password');
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetUsers/changePassword',
        toSubmit
      );
      setPassword('');

      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  return openPassword ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setOpenPassword(false);
          }
        }}
      >
        <div className="rounded-md relative w-full h-auto max-w-screen-sm bg-blend-overlay bg-white">
          <div className="font-semibold text-center text-xl divide-y border-b-4 mt-6">
            <span>Change your password</span>
          </div>
          <div className="grid grid-cols-1 p-4 col-auto gap-4 ">
            <div>
              <label className="font-semibold text-gray-700">Password: </label>
              <input
                type="password"
                className="border-2 border-gray-400 rounded-md w-full"
                value={password}
                onChange={(event) => {
                  setPassword(event?.target.value);
                }}
              />
            </div>
          </div>
          <div className="mx-4">
            <button
              onClick={submit}
              className="text-white font-semibold bg-blue-900 rounded-md p-2 w-full mb-4"
            >
              Submit
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
          buttonLink={'/'}
          buttonMessage={'Ok'}
          successMessage={successMessage}
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

export default UserManagementChangePassword;
