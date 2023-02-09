import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { ENV } from '../../env';
import Image from 'next/image';
import { getBase64 } from 'interfaces/Functions'

const ProductTypeForm = () => {
  const { data: session, status } = useSession();
  const fetchProductCategories = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productSubcategories'
    );
  };
  const [Properties, setProperties] = useState<any[]>([]);

  const fetchProperties = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/property');
  };

  const propertiesQuery = useQuery('fetchProperties', fetchProperties);
  useEffect(() => {
    if (propertiesQuery.data != undefined) {
      setProperties(propertiesQuery.data.data);
    }
  }, [propertiesQuery.data]);

  const fetchSuppliers = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier');
  };

  const fetchSterilizationTypes = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/sterilizationType'
    );
  };

  const sterilizationTypeQuery = useQuery(
    'fetchSterilizationType',
    fetchSterilizationTypes,
    {
      refetchOnWindowFocus: false,
    }
  );

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };


  const productCategoriesQuery = useQuery(
    'fetchProductCategories',
    fetchProductCategories,
    { refetchOnWindowFocus: false }
  );

  const suppliersQuery = useQuery('fetchSuppliers', fetchSuppliers, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (sterilizationTypeQuery.data != undefined) {
      setSterilizationType(sterilizationTypeQuery.data.data);
    }
  }, [sterilizationTypeQuery.data]);


  useEffect(() => {
    if (productCategoriesQuery.data != undefined) {
      setProductCategories(productCategoriesQuery.data.data);
    }
  }, [productCategoriesQuery.data]);

  useEffect(() => {
    if (suppliersQuery.data != undefined) {
      setSuppliers(suppliersQuery.data.data);
    }
  }, [suppliersQuery.data]);

  const [productCode, setProductCode] = useState<string>('');
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [sterilizationType, setSterilizationType] = useState<any[]>([]);
  const [productCategories, setProductCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [descriptionEng, setDescriptionEng] = useState<string>('');
  const [descriptionLocal, setDescriptionLocal] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [barcode, setBarcode] = useState<string>('');
  const [lotNumber, setLotNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [weight, setWeight] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [productCost, setProductCost] = useState<number>();
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [units, setUnits] = useState<number>(1);
  const [selectedSterilizationType, setSelectedSterilizationType] =
    useState<string>(null);
  const [selectedPackagingType, setSelectedPackagingType] =
    useState<string>('');
  const [cleaningType, setCleaningType] = useState<number>();
  const [sterilizationNotes, setSterilizationNotes] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<any>();
  const [userId, setUserId] = useState<number>();
  const [property, setProperty] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [Show, setShow] = useState<any>(false);
  const [isInstrument, setIsInstrument] = useState<boolean>(false);
  const [fileContents, setFileContents] = useState<any>();
  const [fileBase64, setFileBase64] = useState<string>();

  useEffect(() => {
    setProductCost(price * units);
  }, [units, price]);

  const handleSubmit = async () => {
    const toSubmit = {
      nameEng,
      nameLocal,
      descriptionEng,
      descriptionLocal,
      notes,
      sterilizationNotes,
      weight,
      propertyId: property,
      lotNumber,
      serialNumber,
      productCost,
      productCode,
      price,
      supplierId: selectedSupplier,
      sterilizationTypeId: selectedSterilizationType,
      cleaningTypeId: cleaningType,
      productSubcategoryId: selectedCategory,
      packagingType: selectedPackagingType,
      productImage: fileBase64,
      userId,
    };
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productType',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (session != undefined) {
      setUserId(session.user.userDTO.userId);
    }
  }, [session]);

  useEffect(() => {
    if (file) {
      getBase64(file, setFileBase64)
      setFileContents(URL.createObjectURL(file));
    } else {
      setFileContents(null)
      setFileBase64("")
    }
  }, [file]);

  useEffect(() => {
    if (
      productCategories?.find(
        (element) => element.productSubcategoryId === parseInt(selectedCategory)
      )?.productCategoryId === 1
    ) {
      setSelectedPackagingType(
        "Unit"
      );
      setUnits(1);
      setIsInstrument(true);
    } else {
      setIsInstrument(false);
    }
  }, [selectedCategory]);

  return (
    <>
      <div className="p-8">
        <div className="w-full flex flex-col mt-2">
          <div className="flex w-full justify-between">
            <div className="w-full mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                General
              </div>
              <div className="p-4 flex">
                <label className="p-2 font-semibold w-1/6">
                  Product Category:
                </label>
                <select
                  className="rounded-md w-full"
                  value={selectedCategory}
                  onChange={(event: any) => {
                    setSelectedCategory(event.target.value);
                  }}
                >
                  <option value={0}>Select a category...</option>
                  {productCategories.map((element: any) => {
                    return (
                      <option value={element.productSubcategoryId}>
                        {element.nameEng}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="my-4 w-1/2 mr-4">
            <div className="flex flex-col h-full mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Product Details
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <div className="">
                    <label className="font-semibold">Product Name Eng</label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={nameEng}
                      onChange={(event: any) => {
                        setNameEng(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Product Name Local</label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={nameLocal}
                      onChange={(event: any) => {
                        setNameLocal(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="">
                    <label className="font-semibold">
                      Product Description Eng
                    </label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={descriptionEng}
                      onChange={(event: any) => {
                        setDescriptionEng(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">
                      Product Description Local
                    </label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={descriptionLocal}
                      onChange={(event: any) => {
                        setDescriptionLocal(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Product Code:</label>
                  <input
                    value={productCode}
                    type="text"
                    className="w-full rounded-md"
                    onChange={(event: any) => {
                      setProductCode(event.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Notes:</label>
                  <textarea
                    value={notes}
                    className="w-full rounded-md h-full"
                    onChange={(event: any) => {
                      setNotes(event.target.value);
                    }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="">
                    <label className="font-semibold">Lot Number</label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={lotNumber}
                      onChange={(event: any) => {
                        setLotNumber(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Serial Number</label>
                    <input
                      type="number"
                      min="0"
                      className="rounded-md w-full"
                      value={serialNumber}
                      onChange={(event: any) => {
                        setSerialNumber(event?.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Weight(gr)</label>
                    <input
                      min="0"
                      type="number"
                      step=".01"
                      className="rounded-md w-full"
                      value={weight}
                      onChange={(event: any) => {
                        setWeight(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Category of Property</label>
                  <select
                    className="rounded-md w-full"
                    value={property}
                    onChange={(event: any) => {
                      setProperty(event.target.value);
                    }}
                  >
                    <option value={0}>Select a property...</option>
                    {Properties.map((element: any) => {
                      return (
                        <option value={element.propertyId}>
                          {element.nameEng}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="my-4 w-1/2">
            <div className="flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Cost Management
              </div>
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="mb-4">
                    <label className="font-semibold">Packaging Type</label>
                    <select
                      className="rounded-md w-full"
                      value={selectedPackagingType}
                      disabled={isInstrument}
                      onChange={(event: any) => {
                        setSelectedPackagingType(event.target.value);
                      }}
                    >
                      <option value="Package">Package</option>
                      <option value="Unit">Unit</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold">Units</label>
                    <input
                      min="0"
                      type="number"
                      className="rounded-md w-full"
                      value={units}
                      disabled={isInstrument}
                      onChange={(event: any) => {
                        setUnits(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="">
                    <label className="font-semibold">Price(MKD)</label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={price}
                      onChange={(event: any) => {
                        setPrice(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Product Cost</label>
                    <input
                      readOnly
                      type="number"
                      className="rounded-md w-full"
                      value={productCost}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Supplier</label>
                    <select
                      className="rounded-md w-full"
                      value={selectedSupplier}
                      onChange={(event: any) => {
                        setSelectedSupplier(event.target.value);
                      }}
                    >
                      <option value={0}>Select a supplier...</option>
                      {suppliers.map((element: any) => {
                        return (
                          <option value={element.SupplierId}>
                            {element.NameEng}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`flex flex-col mt-2 border-2 rounded-md shadow-md ${isInstrument ? '' : 'opacity-50'
                }`}
            >
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Sterilization
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="font-semibold">Sterilization Type</label>
                  <select
                    className="rounded-md w-full"
                    value={selectedSterilizationType}
                    disabled={!isInstrument}
                    onChange={(event: any) => {
                      setSelectedSterilizationType(event.target.value);
                    }}
                  >
                    <option value={0}>Select sterilization type...</option>
                    {sterilizationType.map((element: any) => {
                      return (
                        <option value={element.sterilizationTypeId}>
                          {element.nameEng}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex justify-between">
                  <div className="flex mr-4">
                    <input
                      disabled={!isInstrument}
                      type="radio"
                      name="cleaning"
                      value={1}
                      checked={cleaningType === 1}
                      onClick={() => {
                        setCleaningType(1);
                      }}
                      className="m-1"
                    />

                    <label className="font-semibold">Ultrasound</label>
                  </div>
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      disabled={!isInstrument}
                      value={2}
                      checked={cleaningType === 2}
                      onClick={() => {
                        setCleaningType(2);
                      }}
                      className="m-1"
                    />
                    <label className="font-semibold">Manual</label>
                  </div>
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      disabled={!isInstrument}
                      value={3}
                      className="m-1"
                      onClick={() => {
                        setCleaningType(3);
                      }}
                      checked={cleaningType === 3}
                    />
                    <label className="font-semibold">Other</label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Notes</label>
                  <textarea
                    className="w-full rounded-md"
                    disabled={!isInstrument}
                    value={sterilizationNotes}
                    onChange={(event: any) => {
                      setSterilizationNotes(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                File
              </div>
              <div className="p-4 w-full">
                <div className="flex justify-between">
                  <label className="cursor-pointer border-2 bg-blue-even-lighter text-gradient border-blue-ocean  font-play font-semibold text-xl p-2 rounded-md w-1/3">
                    Browse
                    <input
                      className="hidden"
                      onChange={(event: any) => {
                        setFile(event.target.files[0]);
                      }}
                      type="file"
                      accept="image/*"
                    />
                  </label>
                  <div>
                    <button className="bg-gradient-top-bottom text-white text-semibold text-center font-play  px-2 pb-1 rounded-full" onClick={() => {
                      setFile(null)
                    }}>x</button>
                  </div>
                </div>
                <div className="ml-16 mt-2">
                  {fileContents ? (
                    <Image
                      src={fileContents}
                      width={600}
                      height={370}
                      className="ml-5 rounded-sm"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-button text-white font-semibold p-2 rounded-md"
        >
          Submit
        </button>
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
          successMessage={'Successfully created product'}
          buttonLink={'/'}
          buttonMessage={'Ok'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default ProductTypeForm;
