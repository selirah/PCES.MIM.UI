import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralPopup';
import ScanComponent from 'components/general/ScanComponents';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';
interface Props {
  intervention: any;
  setIntervention: any;
  setFile: any;
  file: string
}

const Intervention: React.FC<Props> = (props) => {
  const { intervention, setIntervention, setFile, file } = props;
  const complexityTypeQuery = useQuery(
    'fetchComplexityTypes',
    fetchComplexityTypes
  );
  const pricingQuery = useQuery('fetchPricing', fetchPricing);
  const interventionTypesQuery = useQuery(
    'fetchInterventionTypes',
    fetchInterventionTypes
  );
  const [complexityTypes, setComplexityTypes] = useState<any[]>([]);
  const [interventionTypes, setInterventionTypes] = useState<any[]>();
  const [selectedComplexityType, setSelectedComplexityType] = useState<any>();

  const [selectedPricing, setSelectedPricing] = useState<any>();

  const [showInterventionForm, setShowInterventionForm] = useState<boolean>(false)

  const [pricing, setPricing] = useState<any[]>([]);
  const [pricingId, setPricingId] = useState<any>();

  useEffect(() => {
    if (interventionTypesQuery.data != undefined) {
      setInterventionTypes(interventionTypesQuery.data.data);
    }
  }, [interventionTypesQuery.data]);

  useEffect(() => {
    if (complexityTypeQuery.data != undefined) {
      setComplexityTypes(complexityTypeQuery.data.data);
    }
  }, [complexityTypeQuery.data]);

  useEffect(() => {
    if (pricingQuery.data != undefined) {
      setPricing(pricingQuery.data.data);
    }
  }, [pricingQuery.data]);

  useEffect(() => {
    setPricingId(selectedComplexityType?.PricingId);
  }, [selectedComplexityType]);

  useEffect(() => {
    var findNesto = pricing.find((element: any) => {
      return element.PricingId == pricingId;
    });
    setSelectedPricing(findNesto);
  }, [pricingId]);

  return (
    <>
      <div className="w-1/2 shadow-md rounded-md mt-8 border-t-2 p-4 mb-0">
        <label className="text-sm text-gray-600 font-bold">Intervention</label>
        <div className="mt-6 w-full border-b-2"></div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-1/6 font-semibold">
            Code:
          </label>
          <input
            type="text"
            className="w-full  rounded-md border-indigo-900"
            value={intervention.code}
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.code = event.target.value;
              setIntervention(copy);
            }}
          />
        </div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-full font-semibold">
            Surgical Procedure:
          </label>
          <input
            type="text"
            className="w-full  rounded-md border-indigo-900"
            value={intervention.surgicalProcedure}
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.surgicalProcedure = event.target.value;
              setIntervention(copy);
            }}
          />
        </div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-1/6 font-semibold">
            Patient Id:
          </label>
          <input
            type="number"
            className="w-full rounded-md border-indigo-900"
            value={intervention.patientId}
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.patientId = event.target.value;
              setIntervention(copy);
            }}
          />
        </div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-full font-semibold">
            Intervention Type:
          </label>
          <select
            value={intervention.interventionTypeId}
            className="w-full rounded-md border-indigo-900"
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.interventionTypeId = parseInt(event.target.value);
              setIntervention(copy);
            }}
          >
            <option value={0}>Select an intervention type...</option>
            {interventionTypes?.map((element: any) => {
              return (
                <option value={element.InterventionTypeId}>
                  {element.NameEng}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-1/6 font-semibold">
            Complexity:
          </label>
          <select
            value={intervention.complexityTypeId}
            className="w-full rounded-md border-indigo-900"
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.complexityTypeId = parseInt(event.target.value);
              setIntervention(copy);
              setSelectedComplexityType(
                complexityTypes.find(
                  (element: any) => element.ComplexityTypeId == event.target.value
                )
              );
            }}
          >
            <option value={0}>Select a complexity type...</option>
            {complexityTypes?.map((element: any) => {
              return (
                <option value={element.ComplexityTypeId}>
                  {element.NameEng}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mt-2">
          <label className="text-sm  text-gray-800 w-full font-semibold">
            Date of Intervention:
          </label>
          <input
            value={intervention.date}
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.date = event.target.value;
              setIntervention(copy);
            }}
            type="date"
            className="w-full rounded-md border-indigo-900"
          />
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            <ScanComponent setBase64={setFile} />
            {file && file != '' ? <button className="w-1/2 font-semibold" onClick={() => { setShowInterventionForm(true) }}>View Intervention Form 📷</button> : null}
          </div>
        </div>
        <div className="mt-2">
          <label className="text-sm text-gray-800 w-1/6 font-semibold">
            Notes:
          </label>
          <textarea
            className="w-full rounded-md border-indigo-900 h-32"
            placeholder="Write your acceptance notes here..."
            value={intervention.notes}
            onChange={(event: any) => {
              let copy = { ...intervention };
              copy.notes = event.target.value;
              setIntervention(copy);
            }}
          />
        </div>
      </div>
      {showInterventionForm ? <GeneralFailPopup setShow={setShowInterventionForm}>
        <img src={`data:image/jpg;base64,${file}`} />
      </GeneralFailPopup> : null}
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

const fetchPricing = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/pricing');
};

export default Intervention;
