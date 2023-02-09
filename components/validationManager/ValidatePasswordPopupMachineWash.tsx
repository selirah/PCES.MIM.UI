import axios, { AxiosResponse } from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { OpenValidateProduction } from 'types/user-managemnt';
import { ENV } from '../../env';

interface Props {
  openValidate: OpenValidateProduction;
  validatePasswordResult: (isValid: boolean, processId: number) => void;
  onClose: any;
  processId: number;
}

const ValidatePasswordPopupMachineWash: React.FC<Props> = (props) => {
  const { openValidate, validatePasswordResult, onClose, processId } = props;

  const [password, setPassword] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const { data: session } = useSession();

  const onSubmit = async () => {
    const submit = { userId: session.user.userDTO.userId, password };
    try {
      const response = await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetUsers/passwordConfirmation',
        submit
      );

      if (response.status === 200) {
        validatePasswordResult(true, processId);
      }

      setPassword('');
    } catch (error) {
      setShowError(true);
    }
  };

  return openValidate?.open ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            validatePasswordResult(false, processId);
          }
        }}
      >
        <div className="rounded-md relative w-full h-auto max-w-screen-sm bg-blend-overlay bg-white">
          <div className="grid justify-items-stretch">
            <button
              className="justify-self-end px-6 text-lg font-semibold w-0 h-0"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="font-semibold text-center text-xl divide-y border-b-4 mt-6">
            <span>Validate Password</span>
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
              onClick={onSubmit}
              className="text-white font-semibold bg-blue-900 rounded-md p-2 w-full mb-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {showError ? (
        <GeneralFailPopup
          errorMessage="Password incorrect. Try again"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
    </>
  ) : (
    <></>
  );
};

export default ValidatePasswordPopupMachineWash;
