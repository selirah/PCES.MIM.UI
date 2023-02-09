import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import Image from 'next/image';
import SetDetailsForm from 'components/sets/SetDetailsForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from 'components/sets/ProductList';
import axios from 'axios';
import BarcodeSearch from 'components/sets/BarcodeSearch';
import { Product, Set } from 'interfaces/Sets';
import ImageView from 'components/sets/ImageView';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import { ENV } from '../../env';
import { OpenValidateProduction } from 'types/user-managemnt';
import ValidatePasswordPopupProduction from 'components/validationManager/ValidatePasswordPopupProduction';

type Barcode = string;

const SetsOpening: React.FC = () => {
  const [barcode, setBarcode] = useState<Barcode>();
  const [setDetails, setSetDetails] = useState<any>();
  const [productList, setProductList] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const [updateErrorMsg, setUpdateErrorMsg] = useState<string>();
  const [updateSetStatus, setUpdateSetStatus] = useState<boolean>(false);
  const [toSubmit, setToSubmit] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [imageBase64, setImageBase64] = useState<string>('');
  const [total, setTotal] = useState<number>(0);

  const [notes, setNotes] = useState<string>('');

  const [receivedInstruments, setReceivedInstruments] = useState<string>('');
  const [selectedContainer, setSelectedContainer] = useState<number>(0);

  const [selectedTray, setSelectedTray] = useState<number>(0);
  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const onProductsReceived = (products: Product[]) => {
    setProductList(products);
    console.log(onProductsReceived);
  };
  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };

  const validatePasswordResult = async (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      const toSubmit = {
        setId: setDetails.SetId,
        processId: setDetails.ProcessId,
        receivedInstruments,
      };
      try {
        await axios.post(
          `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/setOpening`,
          toSubmit
        );
        setShowSuccess(true);
      } catch (error) {
        setError(error.response.data);
      }
    }
  };
  const getSetDetails = async () => {
    // console.log(barcode)
    setError('');
    if (!barcode.toLowerCase().startsWith('st')) {
      setError('Invalid barcode format');
      return;
    }
    try {
      const response = await axios.get(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          `/Set/simplifiedSetDetailsByBarcode?setBarcode=${barcode}`
      );
      const { data } = response;
      return data;
    } catch (error) {
      setError(error.response.data);
      return;
    }
  };

  useEffect(() => {
    if (setDetails && selectedContainer != 0 && selectedTray != 0) {
      const tray = setDetails.Containers[selectedContainer - 1].trays.find(
        (tray) => tray.number === selectedTray
      );
      if (tray) {
        setProductList(tray.products);
        setImageBase64(tray.imageBase64);
      } else {
        setSelectedTray(0);
      }
    }
  }, [setDetails, selectedContainer, selectedTray]);

  useEffect(() => {
    if (setDetails != undefined) {
      setToSubmit({ ...setDetails, receivedInstruments: receivedInstruments });
    }
  }, [setDetails]);

  const onSubmit = async () => {
    const toSubmit = {
      setId: setDetails.SetId,
      processId: setDetails.ProcessId,
      receivedInstruments,
    };
    try {
      await axios.post(
        `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/setOpening`,
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const { data, refetch, isLoading } = useQuery('setDetails', getSetDetails, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const onSubmitBarcode = () => {
    refetch();
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/machineWash');
  };
  useEffect(() => {
    if (data) {
      setSetDetails(data);
    }
  }, [data, refetch]);

  return (
    <>
      <Head>
        <title>Sets Opening</title>
      </Head>
      <div className="w-full flex flex-col font-play screen-background">
        <div className="border-b-2 h-12">
          <div className="font-semibold font-play text-xl text-left p-2 text-gradient">
            SET OPENING
          </div>
        </div>

        <div className="p-4">
          {error != '' ? (
            <span className="font-semibold font-play text-red-600">
              {error}
            </span>
          ) : null}
          <BarcodeSearch
            setBarcode={setBarcode}
            isLoading={isLoading}
            onSubmitBarcode={onSubmitBarcode}
          />
          <div className="w-full flex flex-col shadow-md rounded-md mt-4 border-blue-navy border-t-4 pb-4">
            <div className="flex flex-col text-base text-blue-navy font-bold pt-4 px-4">
              Set Details
            </div>

            {setDetails && setDetails !== undefined ? (
              <SetDetailsForm
                data={data}
                barcode={barcode}
                setToSubmit={setToSubmit}
                submission={{ data: toSubmit }}
                receivedInstruments={receivedInstruments}
                setReceivedInstruments={setReceivedInstruments}
                onProductsReceived={setProductList}
              />
            ) : (
              <p className="px-4 pt-4">
                We do not have any data available now. Please perform a search
                to begin
              </p>
            )}
          </div>
          {setDetails ? (
            <div className="flex">
              <div className="mt-4 mr-5">
                <label className="text-navy font-play mr-2 font-semibold">
                  Container
                </label>
                <select
                  className="rounded-md font-play"
                  value={selectedContainer}
                  onChange={(e) => {
                    setSelectedContainer(parseInt(e.target.value));
                  }}
                >
                  <option value={0}>Select a container...</option>
                  {setDetails.Containers.map((_, index) => (
                    <option value={index + 1}>Container No. {index + 1}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                {selectedContainer != 0 ? (
                  <>
                    <label className="text-navy font-play mr-2 font-semibold">
                      Tray
                    </label>
                    <select
                      className="rounded-md font-play"
                      value={selectedTray}
                      onChange={(e) =>
                        setSelectedTray(parseInt(e.target.value))
                      }
                    >
                      <option value={0}>Select a tray...</option>
                      {setDetails.Containers[selectedContainer - 1].trays.map(
                        (tray) => (
                          <option value={tray.number}>
                            Tray No. {tray.number}
                          </option>
                        )
                      )}
                    </select>
                  </>
                ) : (
                  <span className="font-play text-navy">
                    Please select a container
                  </span>
                )}
              </div>
              <div className="mt-4 ml-4">
                <p className="mt-2 text-navy font-play font-semibold">
                  Total products: {setDetails.Total[0]}
                </p>
              </div>
            </div>
          ) : null}
          <div className="w-full grid grid-rows-1 grid-cols-9 gap-3">
            <div className="w-full flex flex-col col-span-6 row-span-1 shadow-md rounded-md">
              <ProductList
                productsListing={productList}
                setDetails={setDetails}
                setReceivedInstruments={setReceivedInstruments}
              />
            </div>
            <div className="w-full  flex flex-col col-span-3 row-span-1 shadow-md rounded-md gap-3">
              <ImageView imgBase64={imageBase64} />
              <div className="w-full flex flex-col col-span-2 row-span-1 shadow-md rounded-md border-blue-navy border-t-4">
                <div className="flex flex-col text-base font-bold pt-4 px-4">
                  Notes
                </div>
                <div className="flex flex-col w-full px-4 mt-4">
                  <label className="text-sm text-gray-600 font-bold">
                    Acceptance Notes
                  </label>
                  <textarea
                    value={setDetails?.Notes}
                    rows={8}
                    className="w-full py-2 pl-3 pr-10 border border-gray-300 bg-gray-100 text-left text-sm rounded-md placeholder-gray-500 placeholder-opacity-70 mt-2 disabled:opacity-30"
                    readOnly
                    placeholder="Acceptance notes should be here"
                  ></textarea>
                </div>
                <div className="flex flex-col w-full px-4 mt-4 mb-4">
                  <label className="text-sm text-gray-600 font-bold">
                    Set Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={8}
                    className="w-full py-2 pl-3 pr-10 border border-gray-300 text-left text-sm rounded-md placeholder-gray-500 placeholder-opacity-70 mt-2 disabled:opacity-30"
                    placeholder="Write your set notes here..."
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col">
            <button
              className="w-full rounded-md flex flex-row justify-center items-center bg-gradient-top-bottom font-play text-white text-sm font-bold py-2"
              onClick={() => {
                setOpenValidate({ open: true });
              }}
            >
              {!isSubmitting && <span>Save</span>}
              {isSubmitting && (
                <Image
                  width={16}
                  height={16}
                  src="/waiting-2.svg"
                  className="animate-spin"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      <ValidatePasswordPopupProduction
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
      {showError ? (
        <GeneralFailPopup
          errorMessage="The set you provided is invalid"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          successMessage={'Successfully opened set!'}
          buttonLink={'/machineWash'}
          buttonMessage={'Go To Machine Wash'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SetsOpening;
