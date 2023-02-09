import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useQuery } from 'react-query';
import Image from 'next/image';
import SetPackagingForm from 'components/sets/SetPackagingForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ImageView from 'components/sets/ImageView';
import ProductListPackaging from 'components/sets/ProductListPackaging';
import { useRouter } from 'next/router';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../../env';
import { useSession } from 'next-auth/react';
import GeneralPopup from 'components/general/PopUp/GeneralPopup';
import ValidatePasswordPopupProduction from 'components/validationManager/ValidatePasswordPopupProduction';
import { OpenValidateProduction } from 'types/user-managemnt';

interface Params {
  queryKey: any;
}

const SetsOpening: React.FC = () => {
  // const queryClient = new QueryClient()
  const router = useRouter();
  // const [barcode, setBarcode] = useState<Barcode>();
  const [setDetails, setSetDetails] = useState<any>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const [selectedContainer, setSelectedContainer] = useState<number>(0);
  const [successMessage, showSuccessMessage] = useState<boolean>(false);

  const [selectedTray, setSelectedTray] = useState<number>(0);

  const [weight, setWeight] = useState<string>('');

  const [products, setProducts] = useState<any[]>([]);
  const [imageBase64, setImageBase64] = useState<string>('');
  const [checkedProducts, setCheckedProducts] = useState<number[]>([]);

  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [loadingInstrumentId, setLoadingInstrumentId] = useState<number>(0);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<number>(0);
  const [replacementNote, setReplacementNote] = useState<string>('');
  const [replacementReason, setReplacementReason] = useState<string>('Missing');
  const [openValidate, setOpenValidate] = useState<OpenValidateProduction>({
    open: false,
  });

  const handleOnClose = () => {
    setOpenValidate({ open: false });
  };

  const validatePasswordResult = async (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });

      const toSubmit = {
        setId: setDetails.SetId,
        processId: setDetails.ProcessId,
        weight,
        userId: session.user.userDTO.userId,
        notes,
      };
      try {
        await axios.put(
          `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/SetsPackaging`,
          toSubmit
        );
        setShowSuccess(true);
      } catch (error) {
        setErrorMessage(error.response.data);
      }
    }
  };
  const getSetDetails = async (params: Params) => {
    const [_, { setBarcode }] = params.queryKey;
    // console.log(barcode)
    const response = await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Set/simplifiedSetDetailsByBarcode?setBarcode=${setBarcode}`
    );
    const { data } = response;
    return data;
  };

  const { data, refetch } = useQuery(
    ['setDetails', { setBarcode: router.query.setId }],
    getSetDetails,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (setDetails && selectedContainer != 0 && selectedTray != 0) {
      const tray = setDetails.Containers[selectedContainer - 1].trays.find(
        (tray) => tray.number === selectedTray
      );
      if (tray) {
        setProducts(tray.products);
        setImageBase64(tray.imageBase64);
      } else {
        setSelectedTray(0);
      }
    }
  }, [setDetails, selectedContainer, selectedTray]);

  const saveSetStatus = async (e: any) => {
    e.preventDefault();
    const toSubmit = {
      setId: setDetails.SetId,
      processId: setDetails.ProcessId,
      weight,
      userId: session.user.userDTO.userId,
      notes,
    };
    try {
      await axios.put(
        `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/SetsPackaging`,
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage(error.response.data);
    }
  };

  const replace = async () => {
    setShowPopup(false);
    setLoadingInstrumentId(selectedInstrumentId);
    showSuccessMessage(false);
    setErrorMessage('');
    const toSubmit = {
      setId: setDetails.SetId,
      instrumentId: selectedInstrumentId,
      processId: setDetails.ProcessId,
      productTypeId: products.find(
        (product) => product.instrumentId === selectedInstrumentId
      ).productTypeId,
      locationDepositId: setDetails.LocationDepositId,
      note: replacementNote,
      reason: replacementReason,
      userId: session.user.userDTO.userId,
    };
    try {
      const response = await axios.post(
        `${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/replace`,
        toSubmit
      );
      console.log(checkedProducts);

      setCheckedProducts(
        checkedProducts.filter(
          (instrumentId) => instrumentId !== selectedInstrumentId
        )
      );

      const index = products.findIndex(
        (product) => product.instrumentId === selectedInstrumentId
      );

      let productsCopy = [...products];

      productsCopy[index].instrumentId = response.data;

      setProducts(productsCopy);
      setLoadingInstrumentId(0);
      setSelectedInstrumentId(0);
      showSuccessMessage(true);
      setReplacementNote('');
      setReplacementReason('Missing');
    } catch (error) {
      setErrorMessage(error.response?.data);
      setLoadingInstrumentId(0);
      setSelectedInstrumentId(0);
      setReplacementNote('');
      setReplacementReason('Missing');
    }
  };

  useEffect(() => {
    if (data) {
      let productsCount = 0;
      let traysCount = 0;
      data.Containers.forEach((container) => {
        traysCount += container.trays.length;
        container.trays.forEach((tray) => {
          productsCount += tray.products.length;
        });
      });
      setSetDetails({ ...data, total: productsCount, totalTrays: traysCount });
    }
  }, [data, refetch]);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/autoclaves');
  };

  return (
    <>
      <Head>
        <title>Sets Packaging</title>
      </Head>
      <div className="screen-background">
        <div className="border-b-2 border-blue-700 h-12">
          <div className=" font-play font-semibold text-left ml-12 text-gradient">
            PACKAGING
          </div>
        </div>
        <div className="p-4 font-play">
          <div className="w-full flex flex-col shadow-md rounded-md mt-4 border-blue-navy border-t-4 pb-4">
            <div className="flex flex-col text-base font-bold pt-4 px-4">
              Set Details
            </div>
            {setDetails && setDetails !== undefined ? (
              <>
                <SetPackagingForm
                  weight={weight}
                  setWeight={setWeight}
                  data={setDetails}
                />
              </>
            ) : (
              <p className="px-4 pt-4">
                We do not have any data available now. Please perform a search
                to begin
              </p>
            )}
          </div>
          {setDetails ? (
            <div className="flex mb-4">
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
                  <div className="mt-2">
                    <span className="font-play text-navy font-semibold">
                      Please select a container
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4 ml-4">
                <p className="mt-2 text-navy font-play font-semibold">
                  Total products: {setDetails.Total[0]}
                </p>
              </div>
            </div>
          ) : null}
          {errorMessage && errorMessage != '' ? (
            <div>
              <span className="text-red-600 font-semibold">{errorMessage}</span>
            </div>
          ) : null}
          {successMessage ? (
            <div>
              <span className="text-green-700 font-semibold">
                Successfully replaced instrument
              </span>
            </div>
          ) : null}
          <div className="w-full grid grid-rows-1 grid-cols-9 gap-3">
            <div className="w-full flex flex-col col-span-6 row-span-1 shadow-md rounded-md">
              <ProductListPackaging
                checkedProducts={checkedProducts}
                setCheckedProducts={setCheckedProducts}
                products={products}
                setSelectedInstrument={setSelectedInstrumentId}
                loadingInstrumentId={loadingInstrumentId}
                setShowPopup={setShowPopup}
              />
            </div>

            <div className="w-full  flex flex-col col-span-3 row-span-1 shadow-md rounded-md gap-3">
              <ImageView imgBase64={imageBase64} />

              <div className="w-full flex flex-col col-span-3 row-span-1 shadow-md rounded-md border-blue-navy border-t-4 ">
                <div className="flex flex-col text-base font-bold pt-4 px-4 ">
                  Note
                </div>
                <div className="flex flex-col w-full px-4 py-4 ">
                  <label className="text-sm text-gray-600 font-bold ">
                    Notes
                  </label>
                  <textarea
                    rows={8}
                    value={notes}
                    onChange={(event: any) => {
                      setNotes(event.target.value);
                    }}
                    className="w-full py-2 pl-3 pr-10 border border-gray-300 text-left text-sm rounded-md placeholder-gray-500 placeholder-opacity-70 mt-2 disabled:opacity-30"
                    placeholder="Enter your notes"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full mt-2 flex flex-col">
            <button
              className="w-full disabled:opacity-90 disabled:cursor-not-allowed rounded-md flex flex-row justify-center items-center bg-gradient-top-bottom text-white  font-bold py-3 "
              onClick={() => {
                setOpenValidate({ open: true });
              }}
              disabled={
                checkedProducts.length > 0 ||
                weight === '' ||
                setDetails === undefined
              }
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
            <ValidatePasswordPopupProduction
              validatePasswordResult={validatePasswordResult}
              openValidate={openValidate}
              onClose={handleOnClose}
            />
          </div>
        </div>
      </div>
      {showPopup ? (
        <GeneralPopup setShow={setShowPopup}>
          <div className="w-full h-full">
            <div className="w-full border-b-2 border-navy p-2 bg-gradient-left-right">
              <span className="font-semibold font-play text-white">
                Replacement Information
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between">
                <label className="font-play text-navy font-semibold mt-2 w-1/3">
                  Reason:
                </label>
                <select
                  value={replacementReason}
                  onChange={(e) => {
                    setReplacementReason(e.target.value);
                  }}
                  className="rounded-md w-2/3"
                >
                  <option value="Missing">Missing</option>
                  <option value="Damaged">Damaged</option>
                </select>
              </div>
              <div className="mt-20 flex justify-between">
                <label className="font-play text-navy font-semibold w-1/3">
                  Note:
                </label>
                <textarea
                  className="rounded-md w-2/3"
                  value={replacementNote}
                  onChange={(e) => {
                    setReplacementNote(e.target.value);
                  }}
                />
              </div>
              <div className="text-center mt-12">
                <button
                  className="bg-gradient-top-bottom text-white font-play font-semibold w-full rounded-md py-2"
                  onClick={replace}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </GeneralPopup>
      ) : null}
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : null}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/autoclaves'}
          buttonMessage="Go To Autoclaves"
          successMessage={'Set Packaged'}
          onClick={onClick}
        />
      ) : null}
    </>
  );
};

export default SetsOpening;
