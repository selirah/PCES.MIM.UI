import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { ENV } from '../../env';

type FormProps = {
  setData: any;
};

const ModelForm: React.FC<FormProps> = (props) => {
  const { setData } = props;

  const [complexityTypes, setComplexityTypes] = useState<any[]>([]);
  const [interventionTypes, setInterventionTypes] = useState<any[]>([]);

  const [modelCode, setModelCode] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [descriptionEng, setDescriptionEng] = useState<string>('');
  const [descriptionLocal, setDescriptionLocal] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [layersNumber, setLayersNumber] = useState<number>(0);
  const [envelopeNumber, setEnvelopeNumber] = useState<number>(0);
  const [revisionNumber, setRevisionNumber] = useState<number>(0);
  const [complexityTypeId, setComplexityTypeId] = useState<number>();
  const [interventionTypeId, setInterventionTypeId] = useState<number>();
  const [notes, setNotes] = useState<string>('');
  const [warningNotes, setWarningNotes] = useState<string>('');
  const [expirationPeriod, setExpirationPeriod] = useState<number>(3);
  const [cost, setCost] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<any>();
  const [fileContents, setFileContents] = useState<any>();
  const [firstTwo, setFirstTwo] = useState<any>();
  const [randomNumber, setRandomNumber] = useState<any>();
  const [modelCode2, setModelCode2] = useState<any>();
  const [modelCode1, setModelCode1] = useState<any>();

  const complexityTypesQuery = useQuery(
    'complexityTypes',
    fetchComplexityTypes
  );
  const intervetionTypesQuery = useQuery(
    'interventionTypes',
    fetchInterventionTypes
  );

  useEffect(() => {
    if (complexityTypesQuery.data != undefined) {
      setComplexityTypes(complexityTypesQuery.data.data);
    }
  }, [complexityTypesQuery.data]);
  useEffect(() => {
    if (intervetionTypesQuery.data != undefined) {
      setInterventionTypes(intervetionTypesQuery.data.data);
    }
  }, [intervetionTypesQuery.data]);

  useEffect(() => {
    setFirstTwo(nameEng.substring(0, 2).toUpperCase());
    setRandomNumber(Math.floor(Math.random() * (999 - 100 + 1) + 100));
    console.log(randomNumber);
  }, [nameEng]);

  useEffect(() => {
    setModelCode1(firstTwo + randomNumber);
  }, [randomNumber]);

  useEffect(() => {
    setModelCode(modelCode1 + modelCode2);
    console.log(modelCode);
  }, [modelCode2, nameEng]);

  useEffect(() => {
    if (file != undefined) {
      let data = new FormData();
      data.append('file', file);
      axios
        .post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/File/upload', data)
        .then((response) => {
          setFileName(response.data);
        });
      setFileContents(URL.createObjectURL(file));
    }
  }, [file]);

  useEffect(() => {
    setData({
      modelCode,
      nameEng,
      nameLocal,
      descriptionLocal,
      descriptionEng,
      weight,
      width,
      length,
      height,
      cost,
      expirationPeriod,
      envelopeNumber,
      layersNumber,
      revisionNumber,
      warningNotes,
      notes,
      complexityTypeId,
      interventionTypeId,
      setModelImage: fileName,
    });
  }, [
    modelCode,
    nameEng,
    nameLocal,
    descriptionLocal,
    descriptionEng,
    weight,
    width,
    length,
    height,
    cost,
    expirationPeriod,
    envelopeNumber,
    layersNumber,
    revisionNumber,
    warningNotes,
    notes,
    complexityTypeId,
    interventionTypeId,
    fileName,
  ]);

  return (
    <>
      <div>
        <div className="w-full flex gap-2 justify-between mb-8">
          <div className="w-2/4 flex flex-col mt-2 border-2 rounded-md shadow-md">
            <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
              Model Details
            </div>
            <div className="p-4">
              <div>
                <div className="gap-2">
                  <label className="font-semibold">Model Code</label>
                  <br />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      readOnly
                      type="text"
                      value={modelCode1}
                      className=" rounded-md bg-gray-100"
                    />
                    <input
                      type="text"
                      value={modelCode2}
                      onChange={(event) => {
                        setModelCode2(event.target.value);
                      }}
                      className=" rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold mt-4">Model Name Mac</label>
                  <input
                    value={nameLocal}
                    onChange={(event) => {
                      setNameLocal(event.target.value);
                    }}
                    type="text"
                    className="w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">
                    Model Description Mac
                  </label>
                  <input
                    value={descriptionLocal}
                    onChange={(event) => {
                      setDescriptionLocal(event.target.value);
                    }}
                    type="text"
                    className="w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">Model Name Eng</label>
                  <input
                    value={nameEng}
                    onChange={(event) => {
                      setNameEng(event.target.value);
                    }}
                    type="text"
                    className="w-full rounded-md"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">
                    Model Description Eng
                  </label>
                  <input
                    value={descriptionEng}
                    onChange={(event) => {
                      setDescriptionEng(event.target.value);
                    }}
                    type="text"
                    className="w-full rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Dimensions
              </div>
              <div className="p-4">
                <div className="grid grid-cols-4 gap-8">
                  <div>
                    <label className="font-semibold ">Height(mm)</label>
                    <input
                      value={height}
                      onChange={(event: any) => {
                        setHeight(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Width(mm)</label>
                    <input
                      value={width}
                      onChange={(event: any) => {
                        setWidth(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Length(mm)</label>
                    <input
                      value={length}
                      onChange={(event: any) => {
                        setLength(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Weight(gr)</label>
                    <input
                      value={weight}
                      onChange={(event: any) => {
                        setWeight(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                      step=".01"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Sterilization
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1">
                  <div>
                    <label className="font-semibold">Expiration Period</label>
                  </div>
                  <div>
                    <select
                      className="rounded-md"
                      onChange={(event: any) => {
                        setExpirationPeriod(parseInt(event.target.value));
                      }}
                    >
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-48 flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Cost Management
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-8">
                  <div>
                    <label className="font-semibold ">Model Cost</label>
                    <input
                      value={cost}
                      onChange={(event: any) => {
                        setCost(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                    />
                  </div>
                  {/* <div>
                    <label className="font-semibold ">Intervention Type</label>
                    <select
                      value={interventionTypeId}
                      onChange={(event: any) => {
                        setInterventionTypeId(event.target.value);
                      }}
                      className="w-full rounded-md bg-gray-50"
                    >
                      {interventionTypes.map((element: any) => {
                        return (
                          <option
                            className="bg-white"
                            key={element.InterventionTypeId}
                            value={element.InterventionTypeId}
                          >
                            {element.NameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div> */}
                  <div>
                    <label className="font-semibold ">Set Complexity</label>
                    <select
                      value={complexityTypeId}
                      onChange={(event: any) => {
                        setComplexityTypeId(event.target.value);
                      }}
                      className="w-full rounded-md"
                    >
                      <option className="bg-white">Select a complexity...</option>
                      {complexityTypes.map((element: any) => {
                        return (
                          <option
                            key={element.ComplexityTypeId}
                            className="bg-white"
                            value={element.ComplexityTypeId}
                          >
                            {element.NameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="className= w-full flex gap-2 justify-between mb-8">
          <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
            <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
              Information
            </div>
            <div className="p-4">
              <div className="">
                <div>
                  <label className="font-semibold ">Notes</label>
                  <textarea
                    onChange={(event: any) => {
                      setNotes(event.target.value);
                    }}
                    className="w-full rounded-md"
                    value={notes}
                  />
                </div>
                <div className="grid grid-cols-3 gap-8 mt-4">
                  <div>
                    <label className="font-semibold ">Envelope No.</label>
                    <input
                      value={envelopeNumber}
                      onChange={(event: any) => {
                        setEnvelopeNumber(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Trays No.</label>
                    <input
                      
                      disabled
                      type="number"
                      className="w-full rounded-md bg-gray-200"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Revision No.</label>
                    <input
                      value={revisionNumber}
                      onChange={(event: any) => {
                        setRevisionNumber(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold mt-4">Warning Notes</label>
                  <textarea
                    onChange={(event: any) => {
                      setWarningNotes(event.target.value);
                    }}
                    className="w-full rounded-md"
                    value={warningNotes}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const fetchInterventionTypes = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/AllInterventionTypes'
  );
};

const fetchComplexityTypes = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/AllComplexityTypes'
  );
};

export default ModelForm;
