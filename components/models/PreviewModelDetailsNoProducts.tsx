import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import LessFlashyBaseTable from 'components/general/LessFlashyBaseTable';
import react, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  data: any;
}

const PreviewModelDetails: React.FC<Props> = (props: Props) => {
  const {  data } = props;
  const [complexityTypes, setComplexityTypes] = useState<any[]>([]);
  const [interventionTypes, setInterventionTypes] = useState<any[]>([]);
  const [modelCode, setModelCode] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [productCode, setProductCode] = useState<string>('');
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
  const [interventionTypeId, setInterventionTypeId] = useState<number>();
  const [notes, setNotes] = useState<string>('');
  const [warningNotes, setWarningNotes] = useState<string>('');
  const [expirationPeriod, setExpirationPeriod] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [modelCode2, setModelCode2] = useState<any>();
  const [modelCode1, setModelCode1] = useState<any>();
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<any>();

  const [containers,setContainers] = useState<any[]>([])

  useEffect(() => {
    if (data != undefined) {
      setModelCode(data.modelCode);
      setNameEng(data.nameEng);
      setProductCode(data.productCode);
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
      setComplexityTypeId(complexityTypesQuery.data.data.ComplexityTypeId);
    }
  }, [complexityTypesQuery.data]);
  useEffect(() => {
    if (intervetionTypesQuery.data != undefined) {
      setInterventionTypes(intervetionTypesQuery.data.data);
      setInterventionTypeId(intervetionTypesQuery.data.data.InterventionTypeId);
    }
  }, [intervetionTypesQuery.data]);

  useEffect(() => {
    setModelCode1(modelCode?.substring(0, 5));
    setModelCode2(modelCode.substring(5, modelCode.length));
  }, [modelCode]);


  const addedProducts = [
    {
      Header: "Product Code",
      accessor: "productCode"
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Description',
      accessor: 'description',
    },
    {
      Header: 'Weight',
      accessor: 'weight',
    },
    {
      Header: 'Quantity',
      accessor:'quantity'
    }
  ];
  return (
    <>
      <div>
        <div className="w-full flex gap-2 justify-between mb-8">
          <div className="w-2/4 flex flex-col border-2 rounded-md shadow-md">
            <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
              Model Details
            </div>
            <div className="p-4">
              <div className="">
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
                      readOnly
                      className=" rounded-md bg-gray-100"
                    />
                  </div>
                </div>
                <div className="">
                  <label className="font-semibold mt-4">Model Name Mac</label>
                  <input
                    readOnly
                    value={nameLocal}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                  />
                </div>
                <div className="">
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
                <div className="">
                  <label className="font-semibold mt-4">Model Name Eng</label>
                  <input
                    readOnly
                    value={nameEng}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                  />
                </div>
                <div className="">
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
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Width(mm)</label>
                    <input
                      readOnly
                      value={width}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Length(mm)</label>
                    <input
                      readOnly
                      value={length}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Weight(gr)</label>
                    <input
                      readOnly
                      value={weight}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
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
                    <label className="font-semibold ">Expiration Period</label>
                    <input
                      readOnly
                      value={expirationPeriod + ' Months'}
                      type="string"
                      className="w-full rounded-md bg-gray-100"
                    ></input>
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
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">
                      Set Complexity Type
                    </label>
                    <select
                      disabled
                      value={complexityTypeId}
                      className="w-full rounded-md bg-gray-100"
                    >
                      {complexityTypes.map((element: any) => {
                        return (
                          <option
                            key={element.ComplexityTypeId}
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
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Layers No.</label>
                    <input
                      readOnly
                      value={layersNumber}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="font-semibold ">Revision No.</label>
                    <input
                      readOnly
                      value={revisionNumber}
                      type="number"
                      className="w-full rounded-md bg-gray-100"
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

export default PreviewModelDetails;
