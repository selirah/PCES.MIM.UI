import React, { useEffect, useState } from 'react';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Pricing: React.FC<Props> = (props: Props) => {
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
    try {
      setSuccessMessage('Successfully updated Pricing');
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/Updatepricing',
        submission
      );

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
            value={submission?.NameEng}
            required
            onChange={(event) => {
              setSubmission({
                PricingId: submission?.PricingId,
                NameEng: event.target.value,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
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
            value={submission?.NameLocal}
            onChange={(event) => {
              setSubmission({
                PricingId: submission?.PricingId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: event.target.value,
                DescriptionLocal: submission?.DescriptionLocal,
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
            value={submission?.DescriptionEng}
            onChange={(event) => {
              setSubmission({
                PricingId: submission?.PricingId,
                NameEng: submission?.NameEng,
                DescriptionEng: event.target.value,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
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
            value={submission?.DescriptionLocal}
            onChange={(event) => {
              setSubmission({
                PricingId: submission?.PricingId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: event.target.value,
              });
            }}
            type="text"
          />
        </div>
        <button
          type="submit"
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

export default Pricing;
