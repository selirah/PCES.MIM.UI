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

const OperationRoomForm: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedHospital,setSelectedHospital] = useState<number>(0);

  const fetchClinic = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Clinic');
  };

  const fetchHospital =async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Hospital');
  }


  const clinicQuery = useQuery('fetchClinic', fetchClinic);
  const hospitalQuery = useQuery('fetchHospital', fetchHospital);
  

  const [clinics, setClinics] = useState<any[]>([]);
  const [hospital, setHospital] = useState<any[]>([]);
  const [clinicsState, setClinicsState] = useState<any[]>();

useEffect(() => {
    if (clinicQuery.data != undefined 
      && hospitalQuery.data !=undefined) {
      setClinics(clinicQuery.data.data);
      setHospital(hospitalQuery.data.data);
      if (submission == undefined) {
        setSubmission({
          operationRoomId: submission?.operationRoomId,
          nameEng: submission?.nameEng,
          descriptionEng: submission?.descriptionEng,
          nameLocal: submission?.nameLocal,
          descriptionLocal: submission?.descriptionLocal,
          clinicId: clinicQuery.data.data[0].clinicId,
        });
      }else{
        setSelectedHospital(clinicQuery.data.data?.find((element)=>element.clinicId===submission?.clinicId)?.hospitalId)
      }
    }
  }, [clinicQuery.data, hospitalQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  useEffect(() => {
    setClinicsState(
      clinics?.filter((element: any) => {
        return element.hospitalId == selectedHospital;
      })
    );
  }, [selectedHospital]);

  const handleSubmit = async () => {
    console.log(submission);
    try {
      if (submission?.operationRoomId == undefined) {
        setSuccessMessage('Successfully created Operation Room');
        await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/OperationRoom', submission);
      } else {
        setSuccessMessage('Successfully updated Operation Room');
        await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/OperationRoom', submission);
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
                operationRoomId: submission?.operationRoomId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                clinicId: submission?.clinicId,
                hospitalId: submission?.hospitalId
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
                operationRoomId: submission?.operationRoomId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                clinicId: submission?.clinicId,
                hospitalId: submission?.hospitalId
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
                operationRoomId: submission?.operationRoomId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                clinicId: submission?.clinicId,
                hospitalId: submission?.hospitalId
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
                operationRoomId: submission?.operationRoomId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                clinicId: submission?.clinicId,
                hospitalId: submission?.hospitalId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Hospital:</label>
          <select
            className="w-1/2 rounded-md bg-gray-50"
            value={selectedHospital}
            onChange={(event: any) => {
              setSelectedHospital(event.target.value)
            }}
          >
            <option key={0} value={0}>
            Select a hospital...
            </option>
            {hospital?.map((element: any) => {
              return (
                <option key={element.hospitalId} value={element.hospitalId}>{element.nameEng}</option>
              );
            })}
          </select>
        </div>
      <div className="flex justify-between mb-3">
        <label className="w-1/2 text-left font-semibold p-2">
          Clinic:
        </label>
        <select
          value={submission?.clinicId}
          className="w-1/2 rounded-md bg-gray-50"
          onChange={(event: any) => {
            setSubmission({
              clinicId: event.target.value,
              nameEng: submission?.nameEng,
              descriptionEng: submission.descriptionEng,
              nameLocal: submission?.nameLocal,
              descriptionLocal: submission?.descriptionLocal,
              operationRoomId: submission?.operationRoomId,
            });
          }}
        >
          <option key={0} value={0}>
            Select a clinic...
          </option>
          {clinicsState?.map((element: any) => {
            return (
              <option value={element.clinicId}>
                {element.nameEng}
              </option>
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

export default OperationRoomForm;
