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

const HospitalForm: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const fetchCities = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/City');
  };

  const cityQuery = useQuery('fetchCities', fetchCities);

  const [cities, setCities] = useState<any[]>([]);
  const [central, setCentral] = useState<any[]>([]);
  const [centralState, setCentralState] = useState<any[]>();

  useEffect(() => {
    if (cityQuery.data != undefined) {
      setCities(cityQuery.data.data);
      if (submission == undefined) {
        setSubmission({
          hospitalId: submission?.hospitalId,
          nameEng: submission?.nameEng,
          descriptionEng: submission?.descriptionEng,
          nameLocal: submission?.nameLocal,
          descriptionLocal: submission?.descriptionLocal,
          locationAddress: submission?.locationAddress,
          cityId: cityQuery.data.data[0].cityId,
        });
      }
    }
  }, [cityQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  useEffect(() => {
    setCentralState(
      central?.filter((element: any) => {
        return element.cityId == submission?.cityId;
      })
    );
  }, [submission?.cityId]);


  const handleSubmit = async () => {
    try {
      if (submission?.hospitalId == undefined) {
        setSuccessMessage('Successfully created a Hospital');
        await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Hospital', submission);
      } else {
        setSuccessMessage('Successfully updated a Hospital');
        await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Hospital', submission);
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
                hospitalId: submission?.hospitalId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                locationAddress: submission?.locationAddress,
                cityId: submission?.cityId,
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
                hospitalId: submission?.hospitalId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                locationAddress: submission?.locationAddress,
                cityId: submission?.cityId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Location Address:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.locationAddress}
            onChange={(event) => {
              setSubmission({
                hospitalId: submission?.hospitalId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                locationAddress: event.target.value,
                cityId: submission?.cityId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">City:</label>
          <select
            className="w-1/2 rounded-md bg-gray-50"
            value={submission?.cityId}
            onChange={(event: any) => {
              setSubmission({
                hospitalId: submission?.hospitalId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                locationAddress: submission?.locationAddress,
                cityId: event.target.value,
              });
            }}
          >
            <option key={0} value={0}>
            Select a city...
            </option>
            {cities.map((element: any) => {
              return <option value={element.cityId}>{element.nameEng}</option>;
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

export default HospitalForm;
