import React, { useEffect, useState } from 'react';

import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MachineType: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;

  const [submission, setSubmission] = useState<any>({});
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log(submission);
    try {
      if (submission?.machineTypeId == undefined) {
        setSuccessMessage('Successfully created machine type');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machinetype',
          submission
        );
      } else {
        setSuccessMessage('Successfully updated machine type');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machinetype',
          submission
        );
      }
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <>
      <div className="w-full text-center">
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Name ENG:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameEng}
            onChange={(event) => {
              setSubmission({
                machineTypeId: submission?.machineTypeId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                cycleLimit: submission?.cycleLimit,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Name Local:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameLocal}
            onChange={(event) => {
              setSubmission({
                machineTypeId: submission?.machineTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                cycleLimit: submission?.cycleLimit,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Description ENG:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.descriptionEng}
            onChange={(event) => {
              setSubmission({
                machineTypeId: submission?.machineTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                cycleLimit: submission?.cycleLimit,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Description Local:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.descriptionLocal}
            onChange={(event) => {
              setSubmission({
                machineTypeId: submission?.machineTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                cycleLimit: submission?.cycleLimit,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Cycles Limit:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.cycleLimit}
            onChange={(event) => {
              setSubmission({
                machineTypeId: submission?.machineTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                cycleLimit: event.target.value,
              });
            }}
            type="number"
            min="0"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="text-white font-semibold bg-blue-900 rounded-md p-2 w-full"
        >
          Submit
        </button>
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
  );
};

export default MachineType;
