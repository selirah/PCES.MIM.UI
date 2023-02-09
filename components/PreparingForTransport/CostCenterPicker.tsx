import React, { useEffect, useState } from 'react';

interface Props {
  cities: any;
  hospitals: any;
  clinics: any;
  operationRooms: any;
  CityId?: number;
  HospitalId?: number;
  ClinicId?: number;
  OperationRoomId?: number;
  setOperationRoomId: any;
  name?: string;
}

const CostCenterPicker: React.FC<Props> = (props: Props) => {
  const {
    cities,
    hospitals,
    clinics,
    operationRooms,
    CityId,
    HospitalId,
    ClinicId,
    OperationRoomId,
    setOperationRoomId,
    name,
  } = props;

  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [selectedHospital, setSelectedHospital] = useState<number>(0);
  const [selectedClinic, setSelectedClinic] = useState<number>(0);
  const [selectedOperationRoom, setSelectedOperationRoom] = useState<number>(0);

  const [hospitalsState, setHospitalState] = useState<any[]>();
  const [clinicsState, setClinicsState] = useState<any[]>();
  const [operationRoomsState, setOperationRoomsState] = useState<any[]>();

  useEffect(() => {
    setSelectedCity(CityId != undefined ? CityId : 0);
  }, [CityId]);

  useEffect(() => {
    setSelectedHospital(HospitalId != undefined ? HospitalId : 0);
  }, [HospitalId]);
  useEffect(() => {
    setSelectedClinic(ClinicId != undefined ? ClinicId : 0);
  }, [ClinicId]);
  useEffect(() => {
    setSelectedOperationRoom(
      OperationRoomId != undefined ? OperationRoomId : 0
    );
    setOperationRoomId(OperationRoomId != undefined ? OperationRoomId : 0);
  }, [OperationRoomId]);

  useEffect(() => {
    setHospitalState(
      hospitals?.filter((element: any) => {
        return element.CityId == selectedCity;
      })
    );
  }, [selectedCity]);

  useEffect(() => {
    if (
      !hospitalsState
        ?.map((element) => {
          return element.HospitalId;
        })
        .includes(selectedHospital)
    ) {
      setSelectedHospital(0);
    }
  }, [hospitalsState]);

  useEffect(() => {
    setHospitalState(
      hospitals?.filter((element: any) => {
        return element.CityId == selectedCity;
      })
    );
  }, [selectedCity]);

  useEffect(() => {
    if (
      !hospitalsState
        ?.map((element) => {
          return element.HospitalId;
        })
        .includes(selectedHospital)
    ) {
      setSelectedHospital(0);
    }
  }, [hospitalsState]);

  useEffect(() => {
    setClinicsState(
      clinics?.filter((element: any) => {
        return element.HospitalId == selectedHospital;
      })
    );
  }, [selectedHospital]);

  useEffect(() => {
    if (
      !clinicsState
        ?.map((element: any) => {
          return element.ClinicId;
        })
        .includes(selectedClinic)
    ) {
      setSelectedClinic(0);
    }
  }, [clinicsState]);

  useEffect(() => {
    setOperationRoomsState(
      operationRooms?.filter((element: any) => {
        return element.ClinicId == selectedClinic;
      })
    );
  }, [selectedClinic]);

  useEffect(() => {
    if (
      !operationRoomsState
        ?.map((element: any) => {
          return element.OperationRoomId;
        })
        .includes(selectedOperationRoom)
    ) {
      setSelectedOperationRoom(0);
    }
  }, [operationRoomsState]);

  return (
    <div className="w-full justify-between shadow-md rounded-md mt-2 border-t-2 m-2 p-4">
      <label className="text-sm text-gray-600 font-bold">
        Cost Center {name}
      </label>
      <div className="mt-6 w-full border-b-2"></div>
      <div className="mt-2">
        <label className="text-sm text-gray-800 w-1/6 font-semibold">
          City:
        </label>
        <select
          value={selectedCity}
          className="h-10 rounded-md w-full"
          onChange={(event: any) => {
            setSelectedCity(event.target.value);
          }}
        >
          <option key={0} value={0}>
            Select a city...
          </option>
          {cities?.map((element: any) => {
            return (
              <option key={element.CityId} value={element.CityId}>
                {element.CityName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-3">
        <label className="text-sm text-gray-800 w-1/6 font-semibold">
          Hospital:
        </label>
        <select
          value={selectedHospital}
          className="h-10 rounded-md w-full"
          onChange={(event: any) => {
            setSelectedHospital(event.target.value);
          }}
        >
          <option key={0} value={0}>
            Select a hospital...
          </option>
          {hospitalsState?.map((element: any) => {
            return (
              <option key={element.HospitalId} value={element.HospitalId}>
                {element.HospitalName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-2">
        <label className="text-sm text-gray-800 w-1/6 font-semibold">
          Clinic:
        </label>
        <select
          value={selectedClinic}
          className="h-10 rounded-md w-full"
          onChange={(event: any) => {
            setSelectedClinic(event.target.value);
          }}
        >
          <option key={0} value={0}>
            Select a clinic...
          </option>
          {selectedCity != 0 && selectedHospital
            ? clinics
                ?.filter((element: any) => {
                  return element.HospitalId == selectedHospital;
                })
                .map((element: any) => {
                  return (
                    <option key={element.ClinicId} value={element.ClinicId}>
                      {element.ClinicName}
                    </option>
                  );
                })
            : null}
        </select>
      </div>
      <div className="mt-3">
        <label className="text-sm text-gray-800 w-2/6 font-semibold">
          Operation Room:
        </label>
        <select
          value={selectedOperationRoom}
          className="h-10 rounded-md w-full"
          onChange={(event: any) => {
            setSelectedOperationRoom(event.target.value);
            setOperationRoomId(event.target.value);
          }}
        >
          <option key={0} value={0}>
            Select an operation room...
          </option>
          {selectedCity != 0 && selectedHospital != 0 && selectedClinic != 0
            ? operationRooms
                ?.filter((element: any) => {
                  return element.ClinicId == selectedClinic;
                })
                .map((element: any) => {
                  return (
                    <option
                      key={element.OperationRoomId}
                      value={element.OperationRoomId}
                    >
                      {element.OperationRoomName}
                    </option>
                  );
                })
            : null}
        </select>
      </div>
    </div>
  );
};

export default CostCenterPicker;
