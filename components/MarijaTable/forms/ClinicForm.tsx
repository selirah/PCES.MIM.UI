import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Clinic: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const fetchHospital = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Hospital');
  };

  const hospitalQuery = useQuery('fetchHospital', fetchHospital);

  const [hospital, setHospital] = useState<any[]>([]);

  useEffect(() => {
    if (hospitalQuery.data != undefined) {
      setHospital(hospitalQuery.data.data);     
      if (submission == undefined) {
        setSubmission({
          clinicId: submission?.clinicId,
          nameEng: submission?.nameEng,
          descriptionEng: submission?.descriptionEng,
          nameLocal: submission?.nameLocal,
          descriptionLocal: submission?.descriptionLocal,
          locationAddress: submission?.locationAddress,
          hospitalId: hospitalQuery.data?.data[0].hospitalId
        });
      }
    }
  }, [hospitalQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async (event) => {
    console.log(event.target);
    try {
      if (submission?.clinicId == undefined) {
        setSuccessMessage('Successfully created clinic');
        await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Clinic', submission);
      } else {
        setSuccessMessage('Successfully updated clinic');
        await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Clinic', submission);
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
                clinicId: submission?.clinicId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                hospitalId: submission?.hospitalId,
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
                clinicId: submission?.clinicId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                hospitalId: submission?.hospitalId,
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
                clinicId: submission?.clinicId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                hospitalId: submission?.hospitalId,
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
                clinicId: submission?.clinicId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                hospitalId: submission?.hospitalId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Hospital:</label>
          <select
            className="w-1/2 rounded-md bg-gray-50"
            value={submission?.hospitalId}
            onChange={(event: any) => {
              setSubmission({
                clinicId: submission?.clinicId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                hospitalId: event.target.value,
              });
            }}
          >
            {hospital.map((element: any) => {
              return (
                <option value={element.hospitalId}>{element.nameEng}</option>
              );
            })}
          </select>
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
          buttonLink={'/clinic'}
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

export default Clinic;
