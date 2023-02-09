import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import SubmitStartup from 'pages/startup/SubmitStartup';
import { ENV } from '../../env';
import { element } from 'prop-types';

const StartUp: React.FC = () => {
  const queryAutoclaves = useQuery(
    ['machines', { machineTypeId: '1002' }],
    fetchMachines
  );
  const queryHygiene = useQuery(
    ['machines', { machineTypeId: '1003' }],
    fetchMachines
  );
  const queryThermodesinfectors = useQuery(
    ['machines', { machineTypeId: '1004' }],
    fetchMachines
  );
  const queryManualWash = useQuery(
    ['machines', { machineTypeId: '1006' }],
    fetchMachines
  );
  const queryUltrasound = useQuery(
    ['machines', { machineTypeId: '2' }],
    fetchMachines
  );
  const queryLowTemperature = useQuery(
    ['machines', { machineTypeId: '1005' }],
    fetchMachines
  );
  const [notes, setNotes] = useState('');
  const desc = new Date().toString();

  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [openStartUp, setOpenStartup] = useState<boolean>(false);

  const [autoclaves, setAutoclaves] = useState<any[]>([]);
  const [hygiene, setHygiene] = useState<any[]>([]);
  const [thermodesinfector, setThermodesinfector] = useState<any[]>([]);
  const [manualWash, setManualWash] = useState<any[]>([]);
  const [ultrasound, setUltrasound] = useState<any[]>([]);
  const [lowTemperature, setLowTemperature] = useState<any[]>([]);
  const [toSubmit,setToSubmit] = useState<any>()

  useEffect(() => {
    let autoclaves2 = queryAutoclaves.data?.data.map((element: any) => {
      return {
        MachineCode: element.machineCode,
        MachineId: element.machineId,
        TestBio: '',
        VacuumTest: '',
        BDHT: '',
        Cycle: '',
        Neutralizing: '',
        LotNumber1: '',
        ExpiryDate1: '',
        Dezinfectant: '',
        Detergent: '',
        LotNumber2: '',
        ExpiryDate2: '',
      };
    });
    setAutoclaves(autoclaves2);
  }, [queryAutoclaves.data, queryAutoclaves.refetch]);
  useEffect(() => {
    let hygiene2 = queryHygiene.data?.data.map((element: any) => {
      return {
        MachineCode: element.machineCode,
        MachineId: element.machineId,
        TestBio: '',
        VacuumTest: '',
        BDHT: '',
        Cycle: '',
        Neutralizing: '',
        LotNumber1: '',
        ExpiryDate1: '',
        Dezinfectant: '',
        Detergent: '',
        LotNumber2: '',
        ExpiryDate2: '',
      };
    });
    setHygiene(hygiene2);
  }, [queryHygiene.data, queryHygiene.refetch]);
  useEffect(() => {
    let thermodesinfector2 = queryThermodesinfectors.data?.data.map(
      (element: any) => {
        return {
          MachineCode: element.machineCode,
          MachineId: element.machineId,
          TestBio: '',
          VacuumTest: '',
          BDHT: '',
          Cycle: '',
          Neutralizing: '',
          LotNumber1: '',
          ExpiryDate1: '',
          Dezinfectant: '',
          Detergent: '',
          LotNumber2: '',
          ExpiryDate2: '',
        };
      }
    );
    setThermodesinfector(thermodesinfector2);
  }, [queryThermodesinfectors.data, queryThermodesinfectors.refetch]);
  useEffect(() => {
    let manualWash2 = queryManualWash.data?.data.map((element: any) => {
      return {
        MachineCode: element.machineCode,
        MachineId: element.machineId,
        TestBio: '',
        VacuumTest: '',
        BDHT: '',
        Cycle: '',
        Neutralizing: '',
        LotNumber1: '',
        ExpiryDate1: '',
        Dezinfectant: '',
        Detergent: '',
        LotNumber2: '',
        ExpiryDate2: '',
      };
    });
    setManualWash(manualWash2);
  }, [queryManualWash.data, queryManualWash.refetch]);
  useEffect(() => {
    let ultrasound2 = queryUltrasound.data?.data.map((element: any) => {
      return {
        MachineCode: element.machineCode,
        MachineId: element.machineId,
        TestBio: '',
        VacuumTest: '',
        BDHT: '',
        Cycle: '',
        Neutralizing: '',
        LotNumber1: '',
        ExpiryDate1: '',
        Dezinfectant: '',
        Detergent: '',
        LotNumber2: '',
        ExpiryDate2: '',
      };
    });
    setUltrasound(ultrasound2);
  }, [queryUltrasound.data, queryUltrasound.refetch]);
  useEffect(() => {
    let lowTemperature2 = queryLowTemperature.data?.data.map((element: any) => {
      return {
        MachineCode: element.machineCode,
        MachineId: element.machineId,
        TestBio: '',
        VacuumTest: '',
        BDHT: '',
        Cycle: '',
        Neutralizing: '',
        LotNumber1: '',
        ExpiryDate1: '',
        Dezinfectant: '',
        Detergent: '',
        LotNumber2: '',
        ExpiryDate2: '',
      };
    });
    setLowTemperature(lowTemperature2);
  }, [queryLowTemperature.data, queryLowTemperature.refetch]);

  // const handleSubmit = async () => {
  //   const machines = [
  //     ...autoclaves,
  //     ...hygiene,
  //     ...thermodesinfector,
  //     ...ultrasound,
  //     ...manualWash,
  //     ...lowTemperature,
  //   ];
  //   const toSubmit = {
  //     Notes: notes,
  //     Machines: machines,
  //     UserId: 7,
  //     CentralId: 1,
  //     Description: desc,
  //   };
  //   await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + `/Machine/startUp`, toSubmit);
  //   setShowSuccess(true);
  // };

  const handleAutoclavesTestBioChange = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].TestBio = event.target.value;
    setAutoclaves(autoclaves2);
  };
  const handleAutoclavesExpiryDate1Change = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].ExpiryDate1 = event.target.value;
    setAutoclaves(autoclaves2);
  };

  const handleAutoclavesVacuumTestChange = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].VacuumTest = event.target.value;
    setAutoclaves(autoclaves2);
  };

  const handleAutoclavesBDHTChange = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].BDHT = event.target.value;
    setAutoclaves(autoclaves2);
  };

  const handleAutoclavesCycleChange = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].Cycle = event.target.value;
    setAutoclaves(autoclaves2);
  };

  const handleAutoclavesExpiryDate2Change = (event: any, index: number) => {
    let autoclaves2 = autoclaves.map((element: any) => {
      return element;
    });
    autoclaves2[index].ExpiryDate2 = event.target.value;
    setAutoclaves(autoclaves2);
  };

  const handleHygieneDezinfectantChange = (event: any, index: number) => {
    let hygiene2 = hygiene.map((element: any) => {
      return element;
    });
    hygiene2[index].Dezinfectant = event.target.value;
    setHygiene(hygiene2);
  };

  const handleHygieneLotNumber1Change = (event: any, index: number) => {
    let hygiene2 = hygiene.map((element: any) => {
      return element;
    });
    hygiene2[index].LotNumber1 = event.target.value;
    setHygiene(hygiene2);
  };

  const handleHygieneExpiryDate1Change = (event: any, index: number) => {
    let hygiene2 = hygiene.map((element: any) => {
      return element;
    });
    hygiene2[index].ExpiryDate1 = event.target.value;
    setHygiene(hygiene2);
  };

  const handleThermodesinfectorNeutralizingChange = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].Neutralizing = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleThermodesinfectorLotNumber1Change = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].LotNumber1 = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleThermodesinfectorExpiryDate1Change = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].ExpiryDate1 = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleThermodesinfectorDetergentChange = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].Detergent = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleThermodesinfectorLotNumber2Change = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].LotNumber2 = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleThermodesinfectorExpiryDate2Change = (
    event: any,
    index: number
  ) => {
    let thermodesinfector2 = thermodesinfector.map((element: any) => {
      return element;
    });
    thermodesinfector2[index].ExpiryDate2 = event.target.value;
    setThermodesinfector(thermodesinfector2);
  };

  const handleManualWashDetergentChange = (event: any, index: number) => {
    let manualWash2 = manualWash.map((element: any) => {
      return element;
    });
    manualWash2[index].Detergent = event.target.value;
    setManualWash(manualWash2);
  };

  const handleManualWashLotNumber1Change = (event: any, index: number) => {
    let manualWash2 = manualWash.map((element: any) => {
      return element;
    });
    manualWash2[index].LotNumber1 = event.target.value;
    setManualWash(manualWash2);
  };

  const handleManualWashExpiryDate1Change = (event: any, index: number) => {
    let manualWash2 = manualWash.map((element: any) => {
      return element;
    });
    manualWash2[index].ExpiryDate1 = event.target.value;
    setManualWash(manualWash2);
  };

  const handleUltrasoundDetergentChange = (event: any, index: number) => {
    let ultrasound2 = ultrasound.map((element: any) => {
      return element;
    });
    ultrasound2[index].Detergent = event.target.value;
    setUltrasound(ultrasound2);
  };

  const handleUltrasoundLotNumber1Change = (event: any, index: number) => {
    let ultrasound2 = ultrasound.map((element: any) => {
      return element;
    });
    ultrasound2[index].LotNumber1 = event.target.value;
    setUltrasound(ultrasound2);
  };
  const handleUltrasoundExpiryDate1Change = (event: any, index: number) => {
    let ultrasound2 = ultrasound.map((element: any) => {
      return element;
    });
    ultrasound2[index].ExpiryDate1 = event.target.value;
    setUltrasound(ultrasound2);
  };

  const handleLowTemperatureTestBioChange = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].TestBio = event.target.value;
    setLowTemperature(lowTemperature2);
  };
  const handleLowTemperatureExpiryDate1Change = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].ExpiryDate1 = event.target.value;
    setLowTemperature(lowTemperature2);
  };

  const handleLowTemperatureVacuumTestChange = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].VacuumTest = event.target.value;
    setLowTemperature(lowTemperature2);
  };

  const handleLowTemperatureBDHTChange = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].BDHT = event.target.value;
    setLowTemperature(lowTemperature2);
  };

  const handleLowTemperatureCycleChange = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].Cycle = event.target.value;
    setLowTemperature(lowTemperature2);
  };

  const handleLowTemperatureExpiryDate2Change = (event: any, index: number) => {
    let lowTemperature2 = lowTemperature.map((element: any) => {
      return element;
    });
    lowTemperature2[index].ExpiryDate2 = event.target.value;
    setLowTemperature(lowTemperature2);
  };
  

  useEffect(()=>{
    if(autoclaves!=undefined&&hygiene!=undefined&&thermodesinfector!=undefined&&manualWash!=undefined&&lowTemperature!=undefined&&ultrasound!=undefined)
    {
      const toSubmit={
    
         Notes: notes,
         Description: desc, 
         CentralId: 2021,
         UserId: 7,
         Machines:[    
        ...autoclaves?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!=''),
        ...hygiene?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!=''),
        ...thermodesinfector?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!=''),
        ...manualWash?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!=''),
        ...lowTemperature?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!=''),
        ...ultrasound?.filter((element)=>element.ExpiryDate1 && element.ExpiryDate1!='')
         ]
        
    }
    
    setToSubmit(toSubmit)
  }
    
  },[autoclaves,hygiene,thermodesinfector,manualWash,lowTemperature,ultrasound])

 
 
  return (
    <>
      <div className="grid grid-cols-1 gap-2 ml-2">
        <div className="text-gray-500 space-x-3 m-2 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 ">
          <div className="border-2  mx-6 rounded-xl ">
            <div className="flex justify-between">
              <div className="w-1/5 p-4">Description:</div>
              <div className="w-4/5 p-4">
                <input
                  type="text"
                  className="w-full h-full rounded-xl bg-gray-200 border-white"
                  value={desc}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="p-4 w-1/5">Notes:</div>
              <div className="w-4/5 h-64 p-4">
                <textarea
                  className="w-full h-full rounded-xl"
                  placeholder="Write your notes here..."
                  value={notes}
                  onChange={(event) => {
                    setNotes(event.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg  rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">Autoclaves</label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Machine Number</th>
                  <th className="px-6 py-2 text-center">Test Bio</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Vacuum Test</th>
                  <th className="px-6 py-2 text-center">BD/HT</th>
                  <th className="px-6 py-2 text-center">Cycle</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {autoclaves?.map((element: any, index: number) => {
                  const colorStripe = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        colorStripe ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        {element.MachineCode}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.TestBio}
                          onChange={(event) => {
                            handleAutoclavesTestBioChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleAutoclavesExpiryDate1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.VacuumTest}
                          onChange={(event) => {
                            handleAutoclavesVacuumTestChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.BDHT}
                          onChange={(event) => {
                            handleAutoclavesBDHTChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.Cycle}
                          onChange={(event) => {
                            handleAutoclavesCycleChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate2}
                          onChange={(event) => {
                            handleAutoclavesExpiryDate2Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a>
                            <div>
                              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                                View Machine
                              </button>
                            </div>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{' '}
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg  rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">Higienio</label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Machine Number</th>
                  <th className="px-6 py-2 text-center">Dezinfectant</th>
                  <th className="px-6 py-2 text-center">Lot Number</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {hygiene?.map((element: any, index: number) => {
                  const color = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        color ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        {element.MachineCode}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.Dezinfectant}
                          onChange={(event) => {
                            handleHygieneDezinfectantChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.LotNumber1}
                          onChange={(event) => {
                            handleHygieneLotNumber1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleHygieneExpiryDate1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a>
                            <div>
                              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                                View Machine
                              </button>
                            </div>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{' '}
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">
                Thermodesinfector
              </label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Machine Number</th>
                  <th className="px-6 py-2 text-center">Neutralizing</th>
                  <th className="px-6 py-2 text-center">Lot Number</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Detergent</th>
                  <th className="px-6 py-2 text-center">Lot Number</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {thermodesinfector?.map((element: any, index: number) => {
                  const color = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        color ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        {element.MachineCode}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.Neutralizing}
                          onChange={(event) => {
                            handleThermodesinfectorNeutralizingChange(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.LotNumber1}
                          onChange={(event) => {
                            handleThermodesinfectorLotNumber1Change(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleThermodesinfectorExpiryDate1Change(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.Detergent}
                          onChange={(event) => {
                            handleThermodesinfectorDetergentChange(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.LotNumber2}
                          onChange={(event) => {
                            handleThermodesinfectorLotNumber2Change(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate2}
                          onChange={(event) => {
                            handleThermodesinfectorExpiryDate2Change(
                              event,
                              index
                            );
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a>
                            <div>
                              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                                View Machine
                              </button>
                            </div>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg  rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">Manual Wash</label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Detergent</th>
                  <th className="px-6 py-2 text-center">Lot Number</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {manualWash?.map((element: any, index: number) => {
                  const color = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        color ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.Detergent}
                          onChange={(event) => {
                            handleManualWashDetergentChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.LotNumber1}
                          onChange={(event) => {
                            handleManualWashLotNumber1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleManualWashExpiryDate1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a className="bg-blue-500 rounded-md text-white font-semibold p-2">
                            View Machine
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{' '}
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg w-1/3 rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">Ultrasound</label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Machine Number</th>
                  <th className="px-6 py-2 text-center">Detergent</th>
                  <th className="px-6 py-2 text-center">Lot Number</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {ultrasound?.map((element: any, index: number) => {
                  const color = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        color ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        {element.MachineCode}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.Detergent}
                          onChange={(event) => {
                            handleUltrasoundDetergentChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="text"
                          value={element.LotNumber1}
                          onChange={(event) => {
                            handleUltrasoundLotNumber1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleUltrasoundExpiryDate1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a>
                            <div>
                              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                                View Machine
                              </button>
                            </div>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>{' '}
        </div>
        <div className="m-2 space-x-3 mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4 overflow-x-auto">
          <div className="flex justify-between mb-4">
            <div className="p-4 font-semibold text-lg  rounded-xl mb-2 text-left">
              <label className=" text-black-600 font-bold">
                Low Temperature Sterilazer
              </label>
            </div>
            <div className="flex p-4 justify-between">
              <div className="w-1/3 mt-4 text-gray-500">Search:</div>
              <input type="text" className="mt-3 rounded-xl w-2/3 h-8" />
            </div>
          </div>
          <div className="rounded-xl ">
            <table className=" w-full">
              <thead className="bg-gray-200 text-gray-900">
                <tr>
                  <th className="px-6 py-2 text-center">No</th>
                  <th className="px-6 py-2 text-center">Machine Number</th>
                  <th className="px-6 py-2 text-center">Test Bio</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Vacuum Test</th>
                  <th className="px-6 py-2 text-center">BD/HT</th>
                  <th className="px-6 py-2 text-center">Cycle</th>
                  <th className="px-6 py-2 text-center">Expiry Date</th>
                  <th className="px-6 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 ">
                {lowTemperature?.map((element: any, index: number) => {
                  const color = index % 2 == 0;
                  return (
                    <tr
                      className={`hover:bg-gray-200 ${
                        color ? 'bg-gray-100' : 'bg-white'
                      }`}
                    >
                      <td className="px-6 py-2 text-center">{index + 1}</td>
                      <td className="px-6 py-2 text-center">
                        {element.MachineCode}
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.TestBio}
                          onChange={(event) => {
                            handleLowTemperatureTestBioChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate1}
                          onChange={(event) => {
                            handleLowTemperatureExpiryDate1Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.VacuumTest}
                          onChange={(event) => {
                            handleLowTemperatureVacuumTestChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.BDHT}
                          onChange={(event) => {
                            handleLowTemperatureBDHTChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="text"
                          value={element.Cycle}
                          onChange={(event) => {
                            handleLowTemperatureCycleChange(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <input
                          className="border-0 rounded bg-color-200 w-full"
                          type="date"
                          placeholder="dd-mm-yyyy"
                          value={element.ExpiryDate2}
                          onChange={(event) => {
                            handleLowTemperatureExpiryDate2Change(event, index);
                          }}
                        />
                      </td>
                      <td className="px-6 py-2 text-center">
                        <Link
                          href={{
                            pathname: `/startup/[machineId]`,
                            query: {
                              machineId: element.MachineId,
                            },
                          }}
                        >
                          <a>
                            <div>
                              <button className="bg-blue-500 rounded-md text-white font-semibold p-2">
                                View Machine
                              </button>
                            </div>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>{' '}
        <div>
          <button
            onClick={() => {
              setOpenStartup(true);
            }}
            className="mb-4 mt-4 py-3 w-full bg-blue-900 rounded-xl text-blue-100 hover:text-white hover:scale-100 items-center font-bold"
          >
            <div className="text-lg font-semibold">Save Start Up</div>
          </button>
        </div>
      </div>
      <SubmitStartup
        toSubmit={toSubmit}
        openStartUp={openStartUp}
        setOpenStartUp={setOpenStartup}
      />
    </>
  );
};

export default StartUp;

const fetchMachines = async (params: Params) => {
  const [_, { machineTypeId }] = params.queryKey;
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Machine/bymachinetype?machineTypeId=${machineTypeId}`
  );
};

interface Params {
  queryKey: any;
}
