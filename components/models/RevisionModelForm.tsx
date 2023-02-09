import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import Image from 'next/image';
import { ENV } from '../../env';

type FormProps = {
  data: any;
};

const DuplicateModelForm: React.FC<FormProps> = (props) => {
  const { data } = props;

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

  useEffect(() => {
    if (data != undefined) {
      setModelCode(data.modelCode);
      setNameEng(data.nameEng);
      setDescriptionEng(data.descriptionEng);
      setDescriptionLocal(data.descriptionLocal);
      setNameLocal(data.nameLocal);
      setHeight(data.height);
      setWidth(data.width);
      setLength(data.length);
      setWeight(data.weight);
      setLayersNumber(data.layersNumber);
      setEnvelopeNumber(data.envelopeNumber);
      setRevisionNumber(data.revisionNumber);
      setComplexityTypeId(data.complexityTypeId);
      setInterventionTypeId(data.interventionTypeId);
      setNotes(data.notes);
      setWarningNotes(data.warningNotes);
      setExpirationPeriod(data.expirationPeriod);
      setCost(data.cost);
      setFileName(data.fileName);
      setFile(data.file);
    }
  }, [data]);

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
    setModelCode1(modelCode?.substring(0, 5));
    setModelCode2(modelCode?.substring(5, modelCode.length));
  }, [modelCode]);

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
                      readOnly
                      type="text"
                      value={modelCode2}
                      className=" rounded-md bg-gray-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold mt-4">Model Name Mac</label>
                  <input
                    readOnly
                    value={nameLocal}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">
                    Model Description Mac
                  </label>
                  <input
                    readOnly
                    value={descriptionLocal}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">Model Name Eng</label>
                  <input
                    readOnly
                    value={nameEng}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="font-semibold mt-4">
                    Model Description Eng
                  </label>
                  <input
                    readOnly
                    value={descriptionEng}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
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
                      readOnly
                      value={height}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Width(mm)</label>
                    <input
                      readOnly
                      value={width}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Length(mm)</label>
                    <input
                      readOnly
                      value={length}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                      step=".01"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Weight(gr)</label>
                    <input
                      readOnly
                      value={weight}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
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
                    <select disabled className="rounded-md bg-gray-100">
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
                      readOnly
                      value={cost}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Set Complexity</label>
                    <select
                      disabled
                      value={complexityTypeId}
                      className="w-full rounded-md bg-gray-100"
                    >
                      <option className="bg-white">
                        Select a complexity...
                      </option>
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
                    readOnly
                    className="w-full rounded-md bg-gray-100"
                    value={notes}
                  />
                </div>
                <div className="grid grid-cols-3 gap-8 mt-4">
                  <div>
                    <label className="font-semibold ">Envelope No.</label>
                    <input
                      readOnly
                      value={envelopeNumber}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Trays No.</label>
                    <input
                      disabled
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Revision No.</label>
                    <input
                      readOnly
                      value={revisionNumber}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                      min="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold mt-4">Warning Notes</label>
                  <textarea
                    readOnly
                    className="w-full rounded-md bg-gray-100"
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

export default DuplicateModelForm;
