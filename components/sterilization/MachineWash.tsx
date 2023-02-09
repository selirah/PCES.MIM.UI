import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import ValidatePasswordPopupMachineWash from 'components/validationManager/ValidatePasswordPopupMachineWash';
import router from 'next/router';
import { element } from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { OpenValidateProduction } from 'types/user-managemnt';
import { ENV } from '../../env';

const MachineWash: React.FC = () => {
  const machinesQuery = useQuery('fetchmachines', fetchMachines, {
    refetchOnWindowFocus: false,
  });

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);

  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };

  const validatePasswordResult = (isValid: boolean, processId: number) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      completeWashing(processId);
    }
  };
  const fetchSet = async () => {
    setErrorMessage('');
    try {
      return await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Set/openedsetbybarcode?setBarcode=${barcode}`
      );
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  const fetchFinishedSets = () => {
    return axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/setsmachinewashfinished`
    );
  };
  const finishedSetsQuery = useQuery('fetchFinishedSets', fetchFinishedSets, {
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const setQuery = useQuery('fetchSet', fetchSet, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [sets, setSets] = useState<any[]>([]);
  const [finishedSets, setFinishedSets] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);
  const [barcode, setBarcode] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    let machines2 = machinesQuery.data?.data;
    if (machines2 != undefined) {
      setMachines(
        machines2.map((element: any) => {
          element['sets'] = [];
          element['cycles'] = 0;
          return element;
        })
      );
    }
  }, [machinesQuery.data]);

  useEffect(() => {
    if (finishedSetsQuery.data) {
      setFinishedSets(finishedSetsQuery.data.data);
    }
  }, [finishedSetsQuery.data]);

  useEffect(() => {
    if (setQuery.data != undefined) {
      if (
        !sets.includes(setQuery.data.data) &&
        machines.filter((element: any) => {
          return element.sets.includes(setQuery.data.data);
        }).length == 0
      ) {
        if (
          !machines
            .map((element: any) => {
              return [...element.sets];
            })
            .includes(setQuery.data.data)
        ) {
          setSets([...sets, setQuery.data.data]);
        }
      }
    }
  }, [setQuery.data]);

  const changeCycles = (cycles: number, index: number) => {
    if (cycles < 0) return;
    let machines2 = machines.map((element: any) => {
      return element;
    });
    machines2[index].cycles = cycles;
    setMachines(machines2);
  };

  const addSet = (addIndex: number) => {
    if (selectedIndex != -1) {
      let machines2 = [...machines];
      machines2[selectedIndex].sets.push(sets[addIndex]);
      setMachines(machines2);
      setSets(
        sets.filter((_, index: number) => {
          return index != addIndex;
        })
      );
    } else {
      setErrorMessage('No Machine Selected');
      setShowError(true);
    }
  };
  const submitBarcode = () => {
    setQuery.refetch();
  };

  const removeSet = (removeIndex: number) => {
    let machines2 = machines.map((element: any) => {
      return element;
    });
    let set = machines2[selectedIndex].sets[removeIndex];
    machines2[selectedIndex].sets = machines2[selectedIndex].sets.filter(
      (element: any) => {
        return element != set;
      }
    );
    let sets2 = sets.map((element: any) => {
      return element;
    });
    sets2.push(set);
    setSets(sets2);
  };

  const submit = async (machineId: number) => {
    let machine = machines.find((element) => element.machineId === machineId);
    if (machine.sets.length == 0) {
      setErrorMessage('Nothing to clean');
      setShowError(true);
      return;
    }
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/updateMachineWash',
        machine
      );
      finishedSetsQuery.refetch();
      setMachines(
        machines.map((element) => {
          return { ...element, sets: [] };
        })
      );
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const completeWashing = async (processId: number) => {
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/finishMachineWash',
        { ProcessId: processId }
      );
      setShowSuccess(true);
      finishedSetsQuery.refetch();
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/sets/setsForPackaging');
  };
  return (
    <>
      {' '}
      <div className="m-4">
        <BarcodeSearch
          setBarcode={setBarcode}
          onSubmitBarcode={submitBarcode}
        />
        {errorMessage ? (
          <span className="font-semibold font-play text-red-600">
            {errorMessage}
          </span>
        ) : null}
        <div className=" w-full flex">
          <div className="m-2 w-2/3 space-x-3 text-left  mt-2 shadow-md rounded-md px-4 py-2 border-blue-800 border-t-4">
            <div className="mb-4 font-semibold text-lg  rounded-xl ">
              <label className=" text-black-600 font-bold ">Machines</label>
            </div>
            <div className="m-2 w-full grid grid-cols-4 justify-between">
              {machines.map((element: any, index: number) => {
                if (selectedIndex == index) {
                  return (
                    <div className="border-2 border-blue-600 h-96 text-center m-1 rounded-md relative">
                      <label className="font-semibold text-gray-600">
                        {element.machineCode}
                      </label>
                      <div>
                        {element.sets.map((element: any, index: number) => {
                          return (
                            <div>
                              <label>
                                {element.set.SetCode} - {element.container} -{' '}
                                {element.tray}
                              </label>{' '}
                              <button
                                className="font-bold"
                                onClick={() => removeSet(index)}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute bottom-0 justify-between w-full p-4  border-t-2">
                        <label className="mr-auto">Cycles:</label>
                        <input
                          type="number"
                          value={element.cycles}
                          onChange={(event: any) => {
                            console.log(event.target.value);
                            changeCycles(event.target.value, index);
                          }}
                          className="w-2/3 rounded-md h-8 ml-auto"
                        />
                        <button
                          className="bg-blue-800 text-white p-2 mt-4 rounded-md"
                          onClick={() => {
                            submit(element.machineId);
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="border-2 h-96 text-center m-1 rounded-md relative"
                      onClick={() => {
                        setSelectedIndex(index);
                      }}
                    >
                      <label className="font-semibold text-gray-600">
                        {element.machineCode}
                      </label>
                      <div>
                        {element.sets.map((e: any) => {
                          return (
                            <div>
                              <label>{e.SetCode}</label>
                            </div>
                          );
                        })}
                      </div>
                      <div className="absolute bottom-0 flex justify-between w-full p-4  border-t-2">
                        <label className="mr-auto">Cycles:</label>
                        <input
                          type="number"
                          min="0"
                          value={element.cycles}
                          onChange={(event: any) => {
                            console.log(event.target.value);
                            changeCycles(event.target.value, index);
                          }}
                          className="w-2/3 rounded-md h-8 ml-auto"
                        />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="m-2 w-1/3 space-x-3 text-left mt-2 shadow-md rounded-md px-4 py-2 border-green-800 border-t-4">
            <div className="flex flex-col mb-4 font-semibold text-lg  rounded-xl ">
              <label className=" text-black-600 font-bold">
                Items to Clean
              </label>
              {sets.map((element: any, index: number) => {
                return (
                  <div className="font-normal m-2 border-2 text-center flex">
                    <button
                      className="text-gray-500 font-bold ml-2 hover:text-blue-700 hover:scale-150"
                      onClick={() => {
                        addSet(index);
                      }}
                    >
                      {'<'}
                    </button>
                    <label className="ml-4 text-sm w-full">
                      <div>
                        {element.set.SetCode} - {element.container} -{' '}
                        {element.tray}
                      </div>
                      {element.set.City +
                        ', ' +
                        element.set.Hospital +
                        ', ' +
                        element.set.Clinic +
                        ', ' +
                        element.set.OperationRoom}
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="m-2 w-2/3 space-x-3 text-left mt-2 shadow-md rounded-md px-4 py-2 border-red-800 border-t-4">
          <div className="flex flex-col mb-4 font-semibold text-lg  rounded-xl ">
            <label className=" text-black-600 font-bold mb-8">
              Finished Sets
            </label>
            {finishedSets.map((element: any, index: number) => {
              return (
                <div className="font-play text-semibold m-2 border-b-2 flex justify-between">
                  <label className="ml-4 w-1/2 mx-2">
                    {element.SetCode} -
                    {element.City +
                      ', ' +
                      element.Hospital +
                      ', ' +
                      element.Clinic +
                      ', ' +
                      element.OperationRoom}
                  </label>
                  <button
                    className="p-2 font-play text-semibold bg-blue-800 text-white rounded-md mx-2"
                    onClick={() => {
                      setOpenValidate({
                        open: true,
                      });
                    }}
                  >
                    Complete Washing
                  </button>
                  <ValidatePasswordPopupMachineWash
                    validatePasswordResult={validatePasswordResult}
                    openValidate={openValidate}
                    onClose={handleOnClose}
                    processId={element.ProcessId}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          setShow={setShowSuccess}
          successMessage={'Sets washed'}
          buttonLink="/sets/setsForPackaging"
          buttonMessage={'Go To Sets Packaging'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

const fetchMachines = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/bymachinetype?machineTypeId=1003'
  );
};

export default MachineWash;
