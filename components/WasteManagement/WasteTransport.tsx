import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import router from 'next/router';
import { ENV } from '../../env';
import { useSession } from 'next-auth/react';

const WasteTransport: React.FC = () => {
  const [formData, setFormData] = useState<any>({
    depositName: '',
    depositType: '',
    dateAndTimeOfTransport: '',
    operator: '',
    city: '',
    hospital: '',
    clinic: '',
    operationRoom: '',
  });
  const [barcode, setBarcode] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/waste-arrival');
  };

  const onSubmitBarcode = async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/Process/wasteTransportInfo?interventionBarcode=' +
          barcode
      );
      setFormData({
        ...result.data,
        dateAndTimeOfTransport: new Date(),
        operator: session.user.userDTO.username,
      });
      setIsLoading(false);
    } catch (error) {
      setShowError(true);
    }
  };

  const onSubmit = async () => {
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Process/updateWasteTransport?processId=${formData.processId}`
      );

      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <>
      <div className="m-4">
        <BarcodeSearch
          setBarcode={setBarcode}
          onSubmitBarcode={onSubmitBarcode}
          isLoading={isLoading}
        />
        <div className="w-full flex mt-8">
          <div className="flex flex-col w-1/2">
            <div className="shadow-md rounded-xl mb-4 h-auto">
              <div>
                <label className="bg-gray-200 rounded-t-lg text-lg w-full p-2">
                  Details
                </label>
                <div className="p-4 text-lg">
                  <div className="mb-4">
                    <label>Deposit Name</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.depositName}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                  <div className="">
                    <label>Deposit Type</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.depositType}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md rounded-lg h-auto">
              <div>
                <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
                  Register Transport
                </label>
                <div className="p-4 text-lg">
                  <div className="mb-4">
                    <label>Date and Time of Transport</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.dateAndTimeOfTransport}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                  <div className="">
                    <label>Operator</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.operator}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2 ml-4">
            <div className="shadow-md rounded-lg mb-4">
              <div>
                <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
                  Intervention Date
                </label>
                <div className="p-4 text-lg">
                  <div className="">
                    <label>Intervention Date</label>
                    <br />
                    <input
                      readOnly={true}
                      value={formData.interventionDate
                        ?.substr(0, 16)
                        .replace('T', ' ')}
                      className="bg-gray-200 w-full h-10 p-2 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-md rounded-lg mb-4">
              <label className="bg-gray-200 text-lg w-full p-2 rounded-t-lg">
                Location
              </label>
              <div className="p-4 text-lg">
                <div className="mb-4">
                  <label>City </label>
                  <br />
                  <input
                    readOnly={true}
                    value={formData.city}
                    className="bg-gray-200 w-full h-10 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label>Hospital</label>
                  <br />
                  <input
                    readOnly={true}
                    value={formData.hospital}
                    className="bg-gray-200 w-full h-10 p-2 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label>Clinic</label>
                  <br />
                  <input
                    readOnly={true}
                    value={formData.clinic}
                    className="bg-gray-200 w-full h-10 p-2 rounded-md"
                  />
                </div>
                <div className="">
                  <label>Operation Room</label>
                  <br />
                  <input
                    readOnly={true}
                    value={formData.operationRoom}
                    className="bg-gray-200 w-full h-10 p-2 rounded-md"
                  />
                </div>
              </div>
            </div>
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
          successMessage="Waste transported"
          buttonLink="/waste-arrival"
          buttonMessage="Go To Waste Arrival"
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

export default WasteTransport;
