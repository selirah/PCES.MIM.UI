import axios from 'axios';

import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import dynamic from 'next/dynamic';
import React, { ReactElement, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import CityForm from './forms/CityForm';
import Supplier from './forms/SupplierForm';
import Equipment from './forms/EquipmentForm';
import ComplexityType from './forms/ComplexityTypeForm';
import MachineType from './forms/MachineTypeForm';
import MachineProducers from './forms/MachineProducersForm';
import CentralForm from './forms/CentralForm';
import HospitalForm from './forms/HospitalForm';
import OperationRoomForm from './forms/OperationRoomForm';
import Machine from './forms/MachineForm';
import Clinic from './forms/ClinicForm';
import Deposit from './forms/DepositForm';
import Property from './forms/PropertyForm';
import SterilizationType from './forms/SterilizationTypeForm';
import ProductSubcategory from './forms/ProductSubcategoryForm';
import PackagingType from './forms/PackagingTypeForm';
import ExpirationTypes from './forms/ExpirationTypes';
import MissingDamagedInstruments from './forms/MissingDamagedInstruments';
import Pricing from './forms/Pricing';
import { useRouter } from 'next/router';
import { ENV } from '../../env';

interface Props {
  classifier: string;
  show: boolean;
  setShow: any;
  type: PopupType;
  classifierObject?: object;
}

export enum PopupType {
  ADD,
  EDIT,
  DELETE,
}

const ClassiferPopup: React.FC<Props> = (props) => {
  const { show, setShow, classifier, type, classifierObject } = props;

  const [data, setData] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const router = useRouter();

  const [form, setForm] = useState<ReactElement>(
    <div>No Form for this classifier</div>
  );

  const deleteHandler = async () => {
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/deactivate${classifier}?${classifier}Id=${data[`${classifier}Id`] ? data[`${classifier}Id`] : data[`${classifier.charAt(0).toUpperCase() + classifier.slice(1)}Id`]}`
      );
      setShowSuccess(true);
    } catch (error) {
      console.log(error);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (classifierObject != undefined) {
      setData(classifierObject);
    }
  }, [classifierObject]);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    switch (classifier) {
      case 'city':
        setForm(<CityForm data={data} onClick={onClick} />);
        break;
      case 'supplier':
        setForm(<Supplier data={data} onClick={onClick} />);
        break;
      case 'machineType':
        setForm(<MachineType data={data} onClick={onClick} />);
        break;
      case 'equipment':
        setForm(<Equipment data={data} onClick={onClick} />);
        break;
      case 'complexityType':
        setForm(<ComplexityType data={data} onClick={onClick} />);
        break;
      case 'machineProducers':
        setForm(<MachineProducers data={data} onClick={onClick} />);
        break;
      case 'central':
        setForm(<CentralForm data={data} onClick={onClick} />);
        break;
      case 'hospital':
        setForm(<HospitalForm data={data} onClick={onClick} />);
        break;
      case 'operationRoom':
        setForm(<OperationRoomForm data={data} onClick={onClick} />);
        break;
      case 'machine':
        setForm(<Machine data={data} onClick={onClick} />);
        break;
      case 'clinic':
        setForm(<Clinic data={data} onClick={onClick} />);
        break;
      case 'deposit':
        setForm(<Deposit data={data} onClick={onClick} />);
        break;
      case 'property':
        setForm(<Property data={data} onClick={onClick} />);
        break;
      case 'sterilizationType':
        setForm(<SterilizationType data={data} onClick={onClick} />);
        break;
      case 'productSubcategory':
        setForm(<ProductSubcategory data={data} onClick={onClick} />);
        break;
      case 'packagingType':
        setForm(<PackagingType data={data} onClick={onClick} />);
        break;
      case 'expirationTypes':
        setForm(<ExpirationTypes data={data} onClick={onClick} />);
        break;
      case 'missingDamagedInstruments':
        setForm(<MissingDamagedInstruments data={data} onClick={onClick} />);
        break;
      case 'pricing':
        setForm(<Pricing data={data} onClick={onClick} />);
        break;
    }
  }, [classifier, data]);

  return show ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setShow(false);
          }
        }}
      >
        <div className="rounded-md relative w-full max-w-screen-sm bg-blend-overlay bg-white">
          <div className="w-full border-b-2 font-semibold text-lg flex justify-between">
            <span className="p-4">Modal</span>
            <button
              className="mr-4 text-2xl -mt-8 hover:scale-125 hover:text-red-600"
              onClick={() => {
                setShow(false);
              }}
            >
              x
            </button>
          </div>
          <div className="p-4 w-full text-center">
            {type === PopupType.ADD || type === PopupType.EDIT ? (
              { ...form }
            ) : (
              <div className="font-semibold text-gray-700">
                <span className="text-lg">
                  Are you sure you want to delete this article?
                </span>
                <button
                  onClick={deleteHandler}
                  className="bg-blue-900 p-2 w-2/3 rounded-md text-white font-semibold mt-4"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
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
          successMessage={`Successfully deleted ${classifier}`}
          buttonLink={'/'}
          buttonMessage={'Ok'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  ) : (
    <></>
  );
};

export default ClassiferPopup;
