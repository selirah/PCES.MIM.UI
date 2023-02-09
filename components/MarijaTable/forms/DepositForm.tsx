import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import CostCenterPicker from 'components/PreparingForTransport/CostCenterPicker';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { PopupType } from '../ClassifierPopup';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Deposit: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();

  const [isHospital, setIsHospital] = useState<any>();

  const fetchDepositTypes = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/DepositType');
  };
  const fetchCities = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/City');
  };

  const fetchHospitals = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Hospital');
  };

  const fetchClinics = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Clinic');
  };

  const fetchOperationRooms = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/OperationRoom');
  };

  const depositTypeQuery = useQuery('fetchDepositTypes', fetchDepositTypes);
  const cityQuery = useQuery('fetchCities', fetchCities);
  const hospitalQuery = useQuery('fetchHospitals', fetchHospitals);
  const clinicQuery = useQuery('fetchClinics', fetchClinics);
  const operationRoomQuery = useQuery(
    'fetchOperationRooms',
    fetchOperationRooms
  );

  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [selectedCity, setSelectedCity] = useState(0);
  const [selectedHospital, setSelectedHospital] = useState(0);
  const [selectedClinic, setSelectedClinic] = useState(0);
  const [selectedOperationRoom, setSelectedOperationRoom] = useState(0);

  const [cities, setCities] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [operationRooms, setOperationRooms] = useState<any[]>([]);

  const [hospitalsFiltered, setHospitalsFiltered] = useState<any[]>([]);
  const [clinicsFiltered, setClinicsFiltered] = useState<any[]>([]);
  const [operationRoomsFiltered, setOperationRoomsFiltered] = useState<any[]>(
    []
  );

  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (cityQuery.data != undefined) {
      setCities(cityQuery.data.data);
    }
  }, [cityQuery.data]);

  useEffect(() => {
    if (hospitalQuery.data != undefined) {
      setHospitals(hospitalQuery.data.data);
    }
  }, [hospitalQuery.data]);

  useEffect(() => {
    if (clinicQuery.data != undefined) {
      setClinics(clinicQuery.data.data);
    }
  }, [clinicQuery.data]);

  useEffect(() => {
    if (operationRoomQuery.data != undefined) {
      setOperationRooms(operationRoomQuery.data.data);
    }
  }, [operationRoomQuery.data]);

  useEffect(() => {
    setHospitalsFiltered(
      hospitals.filter((element: any) => element.cityId == selectedCity)
    );
    setSelectedHospital(0);
  }, [selectedCity]);

  useEffect(() => {
    setClinicsFiltered(
      clinics.filter((element: any) => element.hospitalId == selectedHospital)
    );
    setSelectedClinic(0);
  }, [selectedHospital]);

  useEffect(() => {
    setOperationRoomsFiltered(
      operationRooms.filter(
        (element: any) => element.clinicId == selectedClinic
      )
    );
    setSelectedOperationRoom(0);
  }, [selectedClinic]);

  const [depositTypes, setDepositTypes] = useState<any[]>([]);

  useEffect(() => {
    if (depositTypeQuery.data != undefined) {
      setDepositTypes(depositTypeQuery.data.data);
      if (submission == undefined) {
        setSubmission({
          DepositId: submission?.DepositId,
          DepositTypeId: String(depositTypeQuery.data.data[0].DepositTypeId),
        });
      }
    }
  }, [depositTypeQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
      console.log(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    try {
      switch (submission?.DepositTypeId.toString()) {
        case '1': {
          console.log('Operation Room');
          const toSubmit = {
            deposit: submission,
            operationRoomId: selectedOperationRoom,
          };
          if (submission?.DepositId == undefined) {
            await axios.post(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/operationRoomDeposit',
              { ...toSubmit, isHospital }
            );
            setSuccessMessage('Successfully created Operation Room Deposit');
            setShowSuccess(true);
          } else {
            setSuccessMessage('Successfully updated Operation Room Deposit');
            setShowSuccess(true);
            await axios.put(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/updateDeposit',
              toSubmit
            );
          }
          return;
        }
        case '2': {
          console.log('Warehouse');
          console.log(submission);
          const toSubmit = {
            deposit: submission,
            CityId: selectedCity,
          };
          if (submission?.DepositId == undefined) {
            await axios.post(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/warehouseDeposit',
              toSubmit
            );
            setSuccessMessage('Successfully created Warehouse Deposit');
            setShowSuccess(true);
          } else {
            setSuccessMessage('Successfully updated Warehouse Deposit');
            setShowSuccess(true);
            await axios.put(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/updateDeposit',
              toSubmit
            );
          }
          return;
        }
        case '3': {
          console.log('Central');
          console.log({ ...submission, selectedCity });
          const toSubmit = {
            deposit: submission,
            cityId: selectedCity,
          };
          if (submission?.DepositId == undefined) {
            await axios.post(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/centralDeposit',
              toSubmit
            );
            setSuccessMessage('Successfully created Central Deposit');
            setShowSuccess(true);
          } else {
            setSuccessMessage('Successfully updated Central Deposit');
            setShowSuccess(true);
            await axios.put(
              ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/updateDeposit',
              toSubmit
            );
          }
          return;
        }
        default: {
          console.log('Nothing selected');
          setShowError(true);
          return;
        }
      }
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <>
      <div className="w-full text-center">
       
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Deposit Type:
          </label>
          {submission?.DepositId == undefined ? (
            <select
              className="w-1/2 rounded-md bg-gray-50"
              value={submission?.DepositTypeId}
              onChange={(event: any) => {
                setSubmission({
                  DepositId: submission?.DepositId,
                  DepositTypeId: event.target.value,
                });
              }}
            >
              {depositTypes.map((element: any) => {
                return (
                  <option value={element.DepositTypeId}>
                    {element.NameEng}
                  </option>
                );
              })}
            </select>
          ) : (
            <input
              type="text"
              readOnly
              className="w-1/2 rounded-md bg-gray-50"
              value={
                depositTypes.find(
                  (element: any) =>
                    element.DepositTypeId == submission?.DepositTypeId
                )?.NameEng
              }
            />
          )}
        </div>
        {submission?.DepositId == undefined ? (
          <>
            {submission?.DepositTypeId == '1' ? (
              <>
                <div>
                  <div className="flex text-left">
                    <label className="text-left w-1/2 font-semibold p-2">
                      Hospital Deposit:
                    </label>
                    <div className="w-1/2">
                      <input
                        className="align-left"
                        type="checkbox"
                        value={isHospital}
                        onChange={(event: any) => {
                          setIsHospital(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="border-dashed border-t-2 border-black">
                  <div className="font-semibold mt-3">Location</div>
                  <div className="flex justify-between mt-3 mb-3">
                    <label className="w-1/2 font-semibold text-left p-2">
                      City:
                    </label>
                    <select
                      className="rounded-md w-1/2 "
                      value={selectedCity}
                      onChange={(event: any) => {
                        setSelectedCity(event.target.value);
                      }}
                    >
                      <option value={0}>Select a city...</option>
                      {cities.map((element: any) => {
                        return (
                          <option value={element.cityId}>
                            {element.nameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex justify-between mb-3">
                    <label className="w-1/2 font-semibold text-left p-2">
                      Hospital:
                    </label>
                    <select
                      className="rounded-md w-1/2 "
                      value={selectedHospital}
                      onChange={(event: any) => {
                        setSelectedHospital(event.target.value);
                      }}
                    >
                      <option value={0}>Select a hospital...</option>
                      {hospitalsFiltered.map((element: any) => {
                        return (
                          <option value={element.hospitalId}>
                            {element.nameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex justify-between mb-3">
                    <label className="w-1/2 font-semibold text-left p-2">
                      Clinic:
                    </label>
                    <select
                      className="rounded-md w-1/2 "
                      value={selectedClinic}
                      onChange={(event: any) => {
                        setSelectedClinic(event.target.value);
                      }}
                    >
                      <option value={0}>Select a clinic...</option>
                      {clinicsFiltered.map((element: any) => {
                        return (
                          <option value={element.clinicId}>
                            {element.nameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="flex justify-between mb-3">
                    <label className="w-1/2 font-semibold text-left p-2">
                      Operation Room:
                    </label>
                    <select
                      className="rounded-md w-1/2 "
                      value={selectedOperationRoom}
                      onChange={(event: any) => {
                        setSelectedOperationRoom(event.target.value);
                      }}
                    >
                      <option value={0}>Select an operation room...</option>
                      {operationRoomsFiltered.map((element: any) => {
                        return (
                          <option value={element.operationRoomId}>
                            {element.nameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div className="border-dashed border-t-2 border-black">
                <div className="font-semibold mt-3">Location</div>
                <div className="flex justify-between mt-3 mb-3">
                  <label className="w-1/2 font-semibold text-left p-2">
                    City:
                  </label>
                  <select
                    className="rounded-md w-1/2 "
                    value={selectedCity}
                    onChange={(event: any) => {
                      setSelectedCity(event.target.value);
                    }}
                  >
                    <option value={0}>Select a city...</option>
                    {cities.map((element: any) => {
                      return (
                        <option value={element.cityId}>
                          {element.nameEng}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}
          </>
        ) : null}

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

export default Deposit;
