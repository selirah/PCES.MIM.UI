import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import react, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Image from 'next/image';
import router from 'next/router';
import { ENV } from '../../env';
import ReviewProductTypes from './ReviewProductTypes';
import { useSession } from 'next-auth/react';

interface Props {
  data: any;
}

const ModelDetails: React.FC<Props> = ({ data }: Props) => {
  const [complexityTypes, setComplexityTypes] = useState<any[]>([]);
  // const [interventionTypes, setInterventionTypes] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const [modelCode, setModelCode] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [descriptionEng, setDescriptionEng] = useState<string>('');
  const [descriptionLocal, setDescriptionLocal] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [length, setLength] = useState<number>();
  const [weight, setWeight] = useState<number>();
  const [layersNumber, setLayersNumber] = useState<number>();
  const [envelopeNumber, setEnvelopeNumber] = useState<number>();
  const [revisionNumber, setRevisionNumber] = useState<number>();
  const [complexityTypeId, setComplexityTypeId] = useState<number>();
  // const [interventionTypeId, setInterventionTypeId] = useState<number>();
  const [notes, setNotes] = useState<string>('');
  const [warningNotes, setWarningNotes] = useState<string>('');
  const [expirationPeriod, setExpirationPeriod] = useState<number>(3);
  const [expirationDate, setExpirationDate] = useState<string>('');
  const [cost, setCost] = useState<number>();
  const [file, setFile] = useState<any>();
  const [fileContents, setFileContents] = useState<any>();
  const [modelCode2, setModelCode2] = useState<any>();
  const [modelCode1, setModelCode1] = useState<any>();
  const [firstTwo, setFirstTwo] = useState<any>();
  const [randomNumber, setRandomNumber] = useState<any>();
  const [selectedProductTypes, setSelectedProductTypes] = useState<any[]>([]);

  const [Show, setShow] = useState<any>(false);
  useEffect(() => {
    if (data != undefined) {
      setModelCode(data.ModelCode);
      setNameEng('');
      setDescriptionEng(data.DescriptionEng);
      setDescriptionLocal(data.DescriptionLocal);
      setNameLocal('');
      setHeight(data.Height);
      setWidth(data.Width);
      setLength(data.Length);
      setWeight(data.Weight);
      setLayersNumber(data.LayersNumber);
      setEnvelopeNumber(data.EnvelopeNumber);
      setRevisionNumber(data.RevisionNumber);
      setComplexityTypeId(data.ComplexityTypeId);
      // setInterventionTypeId(data.interventionTypeId);
      setNotes(data.notes);
      setWarningNotes(data.warningNotes);
      setExpirationPeriod(data.expirationPeriod);
      setCost(data.cost);
      setFileContents(data.image);
      setModelCode1(data.modelCode?.substring(0, 5));
      setModelCode2(data.modelCode?.substring(5, data.modelCode.length));
      setSelectedProductTypes(data.productTypes)
    }
  }, [data]);

  const complexityTypesQuery = useQuery(
    'complexityTypes',
    fetchComplexityTypes
  );
  // const intervetionTypesQuery = useQuery(
  //   'interventionTypes',
  //   fetchInterventionTypes
  // );

  useEffect(() => {
    if (complexityTypesQuery.data != undefined) {
      setComplexityTypes(complexityTypesQuery.data.data);
      setComplexityTypeId(complexityTypesQuery.data.data.ComplexityTypeId);
    }
  }, [complexityTypesQuery.data]);
  // useEffect(() => {
  //   if (intervetionTypesQuery.data != undefined) {
  //     setInterventionTypes(intervetionTypesQuery.data.data);
  //     setInterventionTypeId(intervetionTypesQuery.data.data.InterventionTypeId);
  //   }
  // }, [intervetionTypesQuery.data]);
  useEffect(() => {
    if (file != undefined) {
      setFileContents(URL.createObjectURL(file));
    }
  }, [file]);

  const handleSubmit = async () => {
    const toSubmit = {
      modelCode: modelCode1 + '-' + modelCode2,
      nameEng,
      descriptionEng,
      descriptionLocal,
      nameLocal,
      height,
      width,
      length,
      weight,
      layersNumber,
      envelopeNumber,
      revisionNumber,
      complexityTypeId,
      // interventionTypeId,
      notes,
      warningNotes,
      expirationPeriod,
      expirationDate,
      cost,
      image: fileContents,
      userId: 2,
      productTypes: selectedProductTypes,
      numberOfContainers: 1
    };
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel/insertSetModelWithProductTypes',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  return (
    <>
      <div>
        <div className="w-full flex gap-2 justify-between mb-8">
          <div className="w-2/4 flex flex-col mt-2 border-2 rounded-md shadow-md">
            <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
              Model Details
            </div>
            <div className="p-4">
              <div className="mt-2">
                <div>
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
                <div className="mt-4">
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
                <div className="mt-4">
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
                <div className="mt-4">
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
                <div className="mt-4">
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Sterilization
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1">
                  <div>
                    <label className="font-semibold">Expiration Time: </label>

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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
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
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Complexity Type</label>
                    <select
                      value={complexityTypeId}
                      onChange={(event: any) => {
                        setComplexityTypeId(event.target.value);
                      }}
                      className="w-full rounded-md bg-gray-50"
                    >
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
            <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
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
                    <label className="font-semibold ">Layers No.</label>
                    <input
                      value={layersNumber}
                      onChange={(event: any) => {
                        setLayersNumber(event.target.value);
                      }}
                      type="number"
                      className="w-full rounded-md"
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
          <div className="w-1/2 flex flex-col mt-2 border-2 rounded-md shadow-md">
            <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
              File Upload
            </div>
            <div className="flex justify-center p-4">
              <label className="font-semibold w-1/2">Image:</label>
              <input
                onChange={(event: any) => {
                  setFile(event.target.files[0]);
                }}
                type="file"
                accept="image/*"
                className="w-1/2 bg-gray-50 border-indigo-900"
              />
            </div>
            <div className="ml-16">
              {fileContents ? (
                <Image src={fileContents} width={300} height={250} />
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="mx-2">
          <ReviewProductTypes
            setData={setSelectedProductTypes}
            currentData={selectedProductTypes}
          />
        </div>
      </div>
      <div>
        <button
          className="w-full h-12 mt-4 font-semibold text-white bg-blue-800 rounded-md"
          onClick={handleSubmit}
        >
          Duplicate Model
        </button>
        {showError ? (
          <GeneralFailPopup
            errorMessage={errorMessage}
            setShow={setShowError}
          />
        ) : (
          ''
        )}
        {showSuccess ? (
          <GeneralSuccessPopup
            buttonLink={'/'}
            buttonMessage={'Ok'}
            successMessage={'Successfully updated model'}
            onClick={onClick}
          />
        ) : (
          ''
        )}{' '}
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

export default ModelDetails;
