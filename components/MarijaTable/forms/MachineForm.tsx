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

const Machine: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');


  const fetchMachineProducers = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machineproducers'
    );
  };

  const producersQuery = useQuery(
    'fetchMachineProducers',
    fetchMachineProducers
  );

  const [producers, setProducers] = useState<any[]>([]);

  useEffect(() => {
    if (producersQuery.data != undefined) {
      setProducers(producersQuery.data.data);
      if (submission?.MachineProducersId == undefined) {
        setSubmission({
          MachineId: submission?.MachineId,
          NameEng: submission?.NameEng,
          DescriptionEng: submission?.DescriptionEng,
          NameLocal: submission?.NameLocal,
          DescriptionLocal: submission?.DescriptionLocal,
          MachineCode: submission?.MachineCode,
          SerialNumber: submission?.SerialNumber,
          InstallationDate: submission?.InstallationDate,
          ValidationDate: submission?.ValidationDate,
          WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
          WarrantyPeriodTo: submission?.WarrantyPeriodTo,
          Cycles: submission?.Cycles,
          MachineProducersId: producersQuery.data?.data[0].MachineProducersId,
          CentralId: submission?.CentralId,
          MachineTypeId: submission?.MachineTypeId
        });
      }
    }
  }, [producersQuery.data]);

  const fetchCentral = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Central');
  };

  const centralQuery = useQuery('fetchCentral', fetchCentral);

  const [central, setCentral] = useState<any[]>([]);

  useEffect(() => {
    if (centralQuery.data != undefined) {
      setCentral(centralQuery.data.data);
      if (submission?.CentralId == undefined) {
        setSubmission({
          MachineId: submission?.MachineId,
          NameEng: submission?.NameEng,
          DescriptionEng: submission?.DescriptionEng,
          NameLocal: submission?.NameLocal,
          DescriptionLocal: submission?.DescriptionLocal,
          MachineCode: submission?.MachineCode,
          SerialNumber: submission?.SerialNumber,
          InstallationDate: submission?.InstallationDate,
          ValidationDate: submission?.ValidationDate,
          WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
          WarrantyPeriodTo: submission?.WarrantyPeriodTo,
          Cycles: submission?.Cycles,
          MachineProducersId: submission?.MachineProducersId,
          CentralId: centralQuery.data.data[0].CentralId,
          MachineTypeId: submission?.MachineTypeId,
        });
      }
    }
  }, [centralQuery.data]);

  const fetchMachineType = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/machinetypes');
  };

  const machineTypeQuery = useQuery('fetchMachineType', fetchMachineType);

  const [machineType, setMachineType] = useState<any[]>([]);

  useEffect(() => {
    if (machineTypeQuery.data != undefined) {
      setMachineType(machineTypeQuery.data.data);
      if (submission?.MachineTypeId == undefined) {
        setSubmission({
          MachineId: submission?.MachineId,
          NameEng: submission?.NameEng,
          DescriptionEng: submission?.DescriptionEng,
          NameLocal: submission?.NameLocal,
          DescriptionLocal: submission?.DescriptionLocal,
          MachineCode: submission?.MachineCode,
          SerialNumber: submission?.SerialNumber,
          InstallationDate: submission?.InstallationDate,
          ValidationDate: submission?.ValidationDate,
          WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
          WarrantyPeriodTo: submission?.WarrantyPeriodTo,
          Cycles: submission?.Cycles,
          MachineProducersId: submission?.MachineProducersId,
          CentralId: submission?.CentralId,
          MachineTypeId: machineTypeQuery.data.data[0].MachineTypeId,
        });
      }
    }
  }, [machineTypeQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log(submission);

    try {
      if (submission?.MachineId == undefined) {
        setSuccessMessage('Successfully created machine');
        await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine', submission);
      } else {
        setSuccessMessage('Successfully updated machine');
        await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine', submission);
      }
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <>
      <div className="w-full text-center">
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">Name ENG:</label>
            <input
              className="rounded-md w-full"
              value={submission?.NameEng}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: event.target.value,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="text"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">Name Local:</label>
            <input
              className="rounded-md w-full"
              value={submission?.NameLocal}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: event.target.value,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="text"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">Description ENG:</label>
            <input
              className="rounded-md w-full"
              value={submission?.DescriptionEng}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: event.target.value,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="text"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">
              Description Local:
            </label>
            <input
              className="rounded-md w-full"
              value={submission?.DescriptionLocal}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: event.target.value,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="text"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">Machine Code:</label>
            <input
              className="rounded-md w-full"
              value={submission?.MachineCode}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: event.target.value,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="text"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">Serial Number:</label>
            <input
              className="rounded-md w-full"
              value={submission?.SerialNumber}
              min="0"
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: event.target.value,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="number"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="mb-3 text-left">
            <label className="font-semibold p-2 w-full">
              Installation Date:
            </label>
            <input
              className="rounded-md w-full"
              value={submission?.InstallationDate}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: event.target.value,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="datetime-local"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2">Validation Date:</label>
            <input
              className="rounded-md w-full"
              value={submission?.ValidationDate}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: event.target.value,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="datetime-local"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2">Warranty Period From:</label>
            <input
              className="rounded-md w-full"
              value={submission?.WarrantyPeriodFrom}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: event.target.value,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="datetime-local"
            />
          </div>
          <div className="mb-3 text-left">
            <label className="font-semibold p-2">Warranty Period To:</label>
            <input
              className="rounded-md w-full"
              value={submission?.WarrantyPeriodTo}
              onChange={(event) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: event.target.value,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
              type="datetime-local"
            />
          </div>
        </div>
        <div className="mb-3 text-left">
          <label className=" font-semibold p-2 w-full">Cycles:</label>
          <input
            className="rounded-md w-full"
            value={submission?.Cycles}
            onChange={(event) => {
              setSubmission({
                MachineId: submission?.MachineId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                NameLocal: submission?.NameLocal,
                DescriptionLocal: submission?.DescriptionLocal,
                MachineCode: submission?.MachineCode,
                SerialNumber: submission?.SerialNumber,
                InstallationDate: submission?.InstallationDate,
                ValidationDate: submission?.ValidationDate,
                WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                Cycles: event.target.value,
                MachineProducersId: submission?.MachineProducersId,
                CentralId: submission?.CentralId,
                MachineTypeId: submission?.MachineTypeId,
              });
            }}
            type="number"
            min="0"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="mb-3 text-left">
            <label className="w-1/2 text-left font-semibold p-2">
              Producer:
            </label>
            <select
              className="w-full rounded-md bg-gray-50"
              value={submission?.MachineProducersId}
              onChange={(event: any) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: event.target.value,
                  CentralId: submission?.CentralId,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
            >
              {producers.map((element: any) => {
                return (
                  <option value={element.MachineProducersId}>
                    {element.NameEng}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 text-left">
            <label className="w-1/2 text-left font-semibold p-2">
              Central:
            </label>
            <select
              className="w-full rounded-md bg-gray-50"
              value={submission?.CentralId}
              onChange={(event: any) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: event.target.value,
                  MachineTypeId: submission?.MachineTypeId,
                });
              }}
            >
              {central.map((element: any) => {
                return (
                  <option value={element.CentralId}>{element.NameEng}</option>
                );
              })}
            </select>
          </div>

          <div className="mb-3 text-left">
            <label className="w-1/2 text-left font-semibold p-2">
              Machine Type:
            </label>
            <select
              className="w-full rounded-md bg-gray-50"
              value={submission?.MachineTypeId}
              onChange={(event: any) => {
                setSubmission({
                  MachineId: submission?.MachineId,
                  NameEng: submission?.NameEng,
                  DescriptionEng: submission?.DescriptionEng,
                  NameLocal: submission?.NameLocal,
                  DescriptionLocal: submission?.DescriptionLocal,
                  MachineCode: submission?.MachineCode,
                  SerialNumber: submission?.SerialNumber,
                  InstallationDate: submission?.InstallationDate,
                  ValidationDate: submission?.ValidationDate,
                  WarrantyPeriodFrom: submission?.WarrantyPeriodFrom,
                  WarrantyPeriodTo: submission?.WarrantyPeriodTo,
                  Cycles: submission?.Cycles,
                  MachineProducersId: submission?.MachineProducersId,
                  CentralId: submission?.CentralId,
                  MachineTypeId: event.target.value,
                });
              }}
            >
              {machineType.map((element: any) => {
                return (
                  <option value={element.MachineTypeId}>
                    {element.NameEng}
                  </option>
                );
              })}
            </select>
          </div>
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

export default Machine;
