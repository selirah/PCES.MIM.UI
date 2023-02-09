import React, { useEffect, useState } from 'react';

import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Equipment: React.FC<Props> = (props: Props) => {
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
      if (submission?.equipmentId == undefined) {
        setSuccessMessage('Successfully created equipment');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/equipment',
          submission
        );
      } else {
        setSuccessMessage('Successfully updated equipment');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/equipment',
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
          <label className="w-1/2 text-left font-semibold p-2">
            Name Local:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameLocal}
            onChange={(event) => {
              setSubmission({
                equipmentId: submission?.equipmentId,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                serialNumber: submission?.serialNumber,
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
                equipmentId: submission?.equipmentId,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                serialNumber: submission?.serialNumber,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Name ENG:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameEng}
            onChange={(event) => {
              setSubmission({
                equipmentId: submission?.equipmentId,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                serialNumber: submission?.serialNumber,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Description Eng:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.descriptionEng}
            onChange={(event) => {
              setSubmission({
                equipmentId: submission?.equipmentId,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                serialNumber: submission?.serialNumber,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Serial Number:
          </label>
          <input
            className="w-1/2 rounded-md"
            min="0"
            value={submission?.serialNumber}
            onChange={(event) => {
              setSubmission({
                equipmentId: submission?.equipmentId,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.nameEng,
                serialNumber: event.target.value,
              });
            }}
            type="number"
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

export default Equipment;
