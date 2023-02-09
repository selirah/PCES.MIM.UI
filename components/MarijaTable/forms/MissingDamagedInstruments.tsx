import React, { useEffect, useState } from 'react';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { ENV } from '../../../env';
import { useSession } from 'next-auth/react';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MissingDamagedInstruments: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;

  const [submission, setSubmission] = useState<any>({});
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const { data: session, status } = useSession();


  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      if (submission?.MissingDamagedInstrumentsId == undefined) {
        setSuccessMessage('Successfully created Missing Damaged Instruments');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/missingDamagedInstruments',
          {...submission,userId:session.user.userDTO.userId}
        );
      } else {
        setSuccessMessage('Successfully updated Expiration Types');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/missingDamagedInstruments',
          {...submission,userId:session.user.userDTO.userId}
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
            required
            onChange={(event) => {
              setSubmission({
                MissingDamagedInstrumentsId:
                  submission?.MissingDamagedInstrumentsId,
                InstrumentId: event.target.value,
                SetId: submission?.SetId,
                ProcessId: submission?.ProcessId,
                Cause: submission?.Cause,
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
                MissingDamagedInstrumentsId:
                  submission?.MissingDamagedInstrumentsId,
                InstrumentId: submission?.InstrumentId,
                SetId: submission?.SetId,
                ProcessId: event.target.value,
                Cause: submission?.Cause,
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
                MissingDamagedInstrumentsId:
                  submission?.MissingDamagedInstrumentsId,
                InstrumentId: submission?.InstrumentId,
                SetId: event.target.value,
                ProcessId: submission?.ProcessId,
                Cause: submission?.Cause,
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
                MissingDamagedInstrumentsId:
                  submission?.MissingDamagedInstrumentsId,
                InstrumentId: submission?.InstrumentId,
                SetId: submission.SetId,
                ProcessId: submission?.ProcessId,
                Cause: event.target.value,
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

export default MissingDamagedInstruments;
