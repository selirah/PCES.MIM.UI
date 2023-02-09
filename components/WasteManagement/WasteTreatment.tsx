import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import router from 'next/router';
import { ENV } from '../../env';

const WasteTreatment: React.FC = () => {
  const machinesQuery = useQuery('fetchmachines', fetchMachines, {
    refetchOnWindowFocus: false,
  });

  const bCodeQuery = useQuery('fetchbCode', fetchBCode, {
    refetchOnWindowFocus: false,
  });

  const fetchTreatment = () => {
    return axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Process/wasteTreatmentInfo?interventionBarcode=${barcode}`
    );
  };

  const treatmentQuery = useQuery('fetchTreatment', fetchTreatment, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  //
  const [bCode, setBCode] = useState<any[]>([]);
  //
  const [treatments, setTreatments] = useState<any[]>([]);
  const [machines, setMachines] = useState<any[]>([]);
  const [barcode, setBarcode] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/waste-washing');
  };

  useEffect(() => {
    let machines2 = machinesQuery.data?.data;
    if (machines2 != undefined) {
      setMachines(
        machines2.map((element: any) => {
          element['bCode'] = [];
          return element;
        })
      );
    }
  }, [machinesQuery.data]);

  useEffect(() => {
    let bCode2 = bCodeQuery.data?.data;
    if (bCode2 != undefined) {
      setBCode(bCode2);
    }
  }, [bCodeQuery.data]);

  useEffect(() => {
    if (treatmentQuery.data != undefined) {
      if (
        !treatments.includes(treatmentQuery.data.data) &&
        machines.filter((element: any) => {
          return element.treatments.includes(treatmentQuery.data.data);
        }).length == 0
      ) {
        if (
          !machines
            .map((element: any) => {
              return [...element.treatments];
            })
            .includes(treatmentQuery.data.data)
        ) {
          setTreatments([...treatments, treatmentQuery.data.data]);
        }
      }
    }
  }, [treatmentQuery.data]);

  const changeCycles = (cycles: number, index: number) => {
    if (cycles < 0) return;
    let machines2 = machines.map((element: any) => {
      return element;
    });
    machines2[index].cycles = cycles;
    setMachines(machines2);
  };

  const submitBarcode = () => {
    let newIndex = bCode.find((item) => {
      if (barcode === item.Barcode) return true;
    });
    let foundIndex = bCode.findIndex((element: any) => {
      return newIndex.Barcode === element.Barcode;
    });
    let machines2 = [...machines];
    machines2[selectedIndex]?.bCode?.push(bCode[foundIndex]);
    setMachines(machines2);
    bCode.splice(foundIndex, 1);

    setBarcode(bCode.filter((bCode) => bCode.foundIndex));
  };

  const addTreatment = (addIndex: number) => {
    if (selectedIndex != -1) {
      let machines2 = [...machines];
      machines2[selectedIndex].bCode?.push(bCode[addIndex]);
      setMachines(machines2);
      setBCode(
        bCode.filter((_, index: number) => {
          return index != addIndex;
        })
      );
      console.log(machines[selectedIndex]);
    } else {
      setErrorMessage('No Machine Selected');
      setShowError(true);
    }
  };

  const removeTreatment = (removeIndex: number) => {
    let machines2 = machines.map((element: any) => {
      return element;
    });
    console.log(machines2[selectedIndex]);
    let treatment = machines2[selectedIndex].bCode[removeIndex];
    machines2[selectedIndex].bCode = machines2[selectedIndex].bCode.filter(
      (element: any) => {
        return element != treatment;
      }
    );
    console.log(machines[selectedIndex].bCode);
    let treatments2 = bCode.map((element: any) => {
      return element;
    });
    treatments2.push(treatment);

    setBCode(treatments2);
  };

  const submit = async () => {
    let treatment = machines[selectedIndex].bCode;
    // const toSubmit={
    //   treatments: treatment,
    //   machineId: machines[selectedIndex].machineId,
    //   cycles: machines[selectedIndex].cycles
    // };
    let toSubmit = machines[selectedIndex];
    if (treatment.length == 0) {
      setErrorMessage('Nothing to clean');
      setShowError(true);
      return;
    }
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/updateWasteTreatment`,
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };
  console.log(bCode);

  return (
    <>
      <div className="m-4">
        <BarcodeSearch
          setBarcode={setBarcode}
          onSubmitBarcode={submitBarcode}
        />
        <div className=" w-full flex">
          <div className="m-2 w-2/3 space-x-3 text-left  mt-2 shadow-md rounded-md px-4 py-2 border-blue-800 border-t-4">
            <div className="mb-4 font-semibold text-lg  rounded-xl ">
              <label className=" text-black-600 font-bold ">Machine</label>
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
                        {element.bCode.map((e: any, index: number) => {
                          return (
                            <div>
                              <label>{e.Barcode}</label>{' '}
                              <button
                                className="font-bold"
                                onClick={() => removeTreatment(index)}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col mb-4 font-semibold text-lg  rounded-xl ">
                        {treatments.map((element: any, index: number) => {
                          return (
                            <div className="font-normal m-2 border-2 text-center flex">
                              <label className="ml-4 text-sm w-full">
                                <div
                                  onClick={() => {
                                    addTreatment(index);
                                  }}
                                >
                                  <div>{element.depositName}</div>
                                  {element.city +
                                    ', ' +
                                    element.hospital +
                                    ', ' +
                                    element.clinic +
                                    ', ' +
                                    element.operationRoom}
                                </div>
                              </label>
                              <button
                                className="font-bold"
                                onClick={() => removeTreatment(index)}
                              >
                                X
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      <div className="absolute bottom-0 grid grid-cols-1 gap-2 w-full p-4 border-t-2">
                        <div>
                          <label className="mr-auto text-left">Cycles:</label>
                          <input
                            type="number"
                            min="0"
                            value={element.cycles}
                            onChange={(event: any) => {
                              changeCycles(event.target.value, index);
                            }}
                            className="w-2/3 rounded-md h-8"
                          />
                        </div>
                        <div>
                          <button
                            className="w-2/3 bg-blue-800 text-white p-2 rounded-md"
                            onClick={submit}
                          >
                            Submit
                          </button>
                        </div>
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
                        {element.bCode.map((e: any) => {
                          return (
                            <div>
                              <label>{e.depositName}</label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>

          <div className="m-2 w-1/3 space-x-3 text-left mt-2 shadow-md rounded-md px-4 py-2 border-green-800 border-t-4">
            <div className="flex flex-col mb-4 font-semibold text-lg  rounded-xl ">
              <label className=" text-black-600 font-bold ">
                Items to Clean
              </label>
              {bCode.map((element: any, index: number) => {
                return (
                  <div className="font-normal m-2 border-2 text-center flex">
                    <button
                      className="text-gray-500 font-bold ml-2 hover:text-blue-700 hover:scale-150"
                      onClick={() => {
                        addTreatment(index);
                      }}
                    >
                      {'<'}
                    </button>
                    <label className="ml-4 text-sm w-full">
                      <div>{element.depositName}</div>
                      {element.Barcode +
                        ', ' +
                        element.hospital +
                        ', ' +
                        element.clinic +
                        ', ' +
                        element.operationRoom}
                    </label>
                  </div>
                );
              })}
            </div>
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
          successMessage="Waste has been treated"
          buttonLink={'/waste-washing'}
          buttonMessage="Go To Waste Washing"
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
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/bymachinetype?machineTypeId=1'
  );
};

const fetchBCode = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/Process/wasteTreatmentInfoAll`
  );
};

export default WasteTreatment;
