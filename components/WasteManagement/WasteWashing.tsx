import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import router from 'next/router';
import { ENV } from '../../env';
import { useSession } from 'next-auth/react';

const WasteWashing: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    productName: '',
    productType: '',
    date: '',
    operator: '',
  });
  const [barcode, setBarcode] = useState();

  const [equipment, setEquipment] = useState<any[]>([]);

  const [selectedEquipment, setSelectedEquipment] = useState<any>({
    equipmentId: 0,
  });

  const [serialNumber, setSerialNumber] = useState<any>('');
  const [expirationDate, setExpirationDate] = useState<any>('');
  const [productLot, setProductLot] = useState<number>(0);
  const [productName, setproductName] = useState<string>('');
  const [processType, setProcessType] = useState<number>(0);
  const [processId, setProcessId] = useState<number>(0);
  const [interventionId, setInterventionId] = useState<number>(0);
  const [Show, setShow] = useState<any>(false);
  const { data: session } = useSession();

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    console.log(interventionId);
  }, [interventionId]);

  useEffect(() => {
    if (processType == 1) {
      setContent(manual);
    } else if (processType == 2) {
      setContent(automatic);
    } else {
      setContent(<div>Select a process type</div>);
    }
  }, [processType]);

  const manual = (
    <div className="shadow-md rounded-lg">
      <div>
        <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
          Manual
        </label>
        <div className="p-4 text-lg">
          <div className="mb-4">
            <label>Product Lot</label>
            <br />
            <input
              className="w-full h-10 p-2 rounded-md"
              type="number"
              value={productLot}
              onChange={(event: any) => {
                setProductLot(event.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label>Product Name</label>
            <br />
            <input
              className="w-full h-10 p-2 rounded-md"
              type="text"
              value={productName}
              onChange={(event: any) => {
                setproductName(event.target.value);
              }}
            />
          </div>
          <div className="">
            <label>Expiration Date</label>
            <br />
            <input
              className="w-full h-10 p-2 rounded-md"
              type="date"
              value={expirationDate}
              onChange={(event: any) => {
                setExpirationDate(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const automatic = (
    <div className="shadow-md rounded-lg">
      <div>
        <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
          Automatic
        </label>
        <div className="p-4 text-lg">
          <div className="mb-4">
            <label>Equipment</label>
            <br />
            <select
              key={
                selectedEquipment != undefined
                  ? selectedEquipment.equipmentId
                  : 0
              }
              value={
                selectedEquipment != undefined
                  ? selectedEquipment.equipmentId
                  : 0
              }
              className="w-full h-10 p-2 rounded-md"
              onChange={(event: any) => {
                handleEquipmentChange(event.target.value);
              }}
            >
              <option value={0}>Select an equipment...</option>
              {equipment.map((element: any) => {
                return (
                  <option key={element.equipmentId} value={element.equipmentId}>
                    {element.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="">
            <label>Serial Number</label>
            <br />
            <input
              min="0"
              className="w-full h-10 p-2 rounded-md"
              type="number"
              value={serialNumber}
              onChange={(event: any) => {
                    setSerialNumber(event?.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const [content, setContent] = useState<any>(<div>Select a process type</div>);

  const fetchEquipment = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Machine/equipment');
  };

  const equipmentQuery = useQuery('fetchEquipment', fetchEquipment);

  useEffect(() => {
    if (equipmentQuery.data != undefined) {
      setEquipment(
        equipmentQuery.data.data.map((element: any) => {
          return {
            equipmentId: element.equipmentId,
            name: element.nameEng,
          };
        })
      );
    }
  }, [equipmentQuery.data]);
  const fetchTreatmentInfo = async () => {
    try {
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Process/wasteWashingInfo?interventionBarcode=${barcode}`
      );
      return result;
    } catch (error) {
      setShowError(true);
    }
  };

  const { isLoading, data, refetch } = useQuery(
    ['fetchInfo', { barcode: barcode }],
    fetchTreatmentInfo,
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  useEffect(() => {
    if (data != undefined) {
      setProcessId(data.data.ProcessId);
      setInterventionId(data.data.InterventionId);
    }
  }, [data]);

  const onSubmitBarcode = () => {
    refetch();
  };

  const onSubmit = async () => {
    let toSubmit = {} as any;
    if (processType == 1) {
      toSubmit = {
        equipmentId: null,
        processId,
        interventionId,
        serialNumber: null,
        productLot: productLot,
        productName: productName,
        expirationDate: expirationDate,
      };
    } else {
      toSubmit = {
        productLot: null,
        expirationDate: null,
        processId,
        interventionId,
        productName: null,
        equipmentId: selectedEquipment,
        serialNumber: serialNumber,
      };
    }

    toSubmit['wasteWashingType'] = processType == 1 ? 'Manual' : 'Automatic';
    try {
      //setSuccessMessage('Successfully updated property');
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Process/updateWasteWashing?processId=${processId}`,
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (data != undefined) {
      let dataToAdd = data.data;
      dataToAdd['date'] = new Date();
      dataToAdd['operator'] = session.user.userDTO.username;
      setFormData(dataToAdd);
    }
  }, [data, refetch]);

  const handleEquipmentChange = (equipmentId: number) => {
    setSelectedEquipment(
      equipment.find((element) => {
        return element.equipmentId == equipmentId;
      })
    );
  };

  useEffect(() => {
    if (processType == 1) {
      setContent(manual);
    } else if (processType == 2) {
      setContent(automatic);
    } else {
      setContent(<div>Select a process type</div>);
    }
  }, [
    serialNumber,
    selectedEquipment,
    expirationDate,
    productLot,
    productName,
  ]);

  return (
    <>
      <div className="m-4">
        <BarcodeSearch
          setBarcode={setBarcode}
          onSubmitBarcode={onSubmitBarcode}
          isLoading={isLoading}
        />
        <div className="w-full flex ">
          <div className="flex flex-col w-full">
            <div className="shadow-md rounded-xl mb-4"></div>
            <div className="shadow-md rounded-lg">
              <div>
                <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
                  Washing
                </label>
                <div className="p-4 text-lg">
                  <div className="mb-4">
                    <label>Date</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.date}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Operator</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.operator}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                  <div className="mb-4">
                    <label>Select Process Type</label>
                    <br />
                    <select
                      value={processType}
                      onChange={(event: any) => {
                        setProcessType(event.target.value);
                      }}
                      className="w-full h-10 p-2 rounded-md"
                    >
                      <option key={0} value={0}>
                        {' '}
                      </option>
                      <option key={1} value={1}>
                        Manual
                      </option>
                      <option key={2} value={2}>
                        Automatic
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {content}
          </div>
        </div>
        <button
          className="bg-blue-800 text-white text-lg rounded-md w-full mt-4 h-10 font-semibold hover:bg-blue-600"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage="Waste has been washed"
          buttonLink="/"
          buttonMessage="Ok"
          onClick={onClick}
        />
      ) : (
        ''
      )}
      {showError ? (
        <GeneralFailPopup
          setShow={setShowError}
          errorMessage="Something went wrong. Try again"
        />
      ) : (
        ''
      )}
    </>
  );
};

export default WasteWashing;
