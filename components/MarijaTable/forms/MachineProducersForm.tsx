import React, { useEffect, useState } from 'react';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MachineProducers: React.FC<Props> = (props: Props) => {
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
      if (submission?.MachineProducersId == undefined) {
        setSuccessMessage('Successfully created a Machine Producer');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machineproducers',
          submission
        );
      } else {
        setSuccessMessage('Successfully updated a Machine Producer');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machineproducer',
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
            value={submission?.NameEng}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: event.target.value,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
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
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: event.target.value,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
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
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: event.target.value,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
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
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: event.target.value,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Address:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.Address}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: event.target.value,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Account Number:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.AccountNumber}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: event.target.value,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Phone Number:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.PhoneNumber}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: event.target.value,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: submission?.ProducerCode,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Email :</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.Email}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: event.target.value,
                ProducerCode: submission?.ProducerCode,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Producer Code:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.ProducerCode}
            onChange={(event) => {
              setSubmission({
                MachineProducersId: submission?.MachineProducersId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                Address: submission?.Address,
                PhoneNumber: submission?.PhoneNumber,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                ProducerCode: event.target.value,
              });
            }}
            type="text"
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
export default MachineProducers;
