import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ComplexityType: React.FC<Props> = (props: Props) => {
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
      if (submission?.ComplexityTypeId == undefined) {
        setSuccessMessage('Successfully created Complexity Type');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/addComplexityType',
          submission
        );
      } else {
        setSuccessMessage('Successfully updated Complexity Type');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/updateComplexityType',
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
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                price: submission?.price,
                validFrom: submission?.validFrom,
                validTo: submission?.validTo,
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
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                price: submission?.price,
                validFrom: submission?.validFrom,
                validTo: submission?.validTo,
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
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                price: submission?.price,
                validFrom: submission?.validFrom,
                validTo: submission?.validTo,
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
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                price: submission?.price,
                validFrom: submission?.validFrom,
                validTo: submission?.validTo,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Price(MKD):</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.price}
            onChange={(event) => {
              setSubmission({
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                price: event.target.value,
                validFrom: submission?.validFrom,
                validTo: submission?.validTo,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Valid From:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.validFrom}
            onChange={(event) => {
              setSubmission({
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                price: submission?.price,
                validFrom: event.target.value,
                validTo: submission?.validTo,
              });
            }}
            type="datetime-local"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Valid To:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.validTo}
            onChange={(event) => {
              setSubmission({
                ComplexityTypeId: submission?.ComplexityTypeId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                price: submission?.price,
                validFrom: submission?.validFrom,
                validTo: event.target.value,
              });
            }}
            type="datetime-local"
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
          buttonLink={'/complexityType'}
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

export default ComplexityType;
