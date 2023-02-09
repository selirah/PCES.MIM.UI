import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import react, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import { ENV } from '../../env';

interface Props {
  data: any;
}

const EditProductTypeDetails: React.FC<Props> = (props: Props) => {
  const { data } = props;

  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const [sterilizationType, setSterilizationType] = useState<any[]>([]);

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [productSubcategories, setProductSubcategories] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);

  const [propertyId, setPropertyId] = useState<any>();
  const [property, setProperty] = useState<string>('');
  const [productSubcategoryId, setProductSubcategoryId] = useState<any>();
  const [productTypeId, setProductTypeId] = useState<any>();
  const [supplierId, setSupplierId] = useState<any>();
  const [selectedSupplierId, setSelectedSupplierId] = useState<any>();

  const [productCode, setProductCode] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [descriptionEng, setDescriptionEng] = useState<string>('');
  const [descriptionLocal, setDescriptionLocal] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [lotNumber, setLotNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [weight, setWeight] = useState<any>();
  const [quantity, setQuantity] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [productCost, setProductCost] = useState<any>();
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [cleaningTypeId, setCleaningTypeId] = useState<any>();
  const [sterilizationNotes, setSterilizationNotes] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [file, setFile] = useState<any>();
  const [userId, setUserId] = useState<any>();
  const [selectedProductSubcategory, setSelectedProductSubcategory] =
    useState<any>();
  const [packagingType, setPackagingType] = useState<any[]>([]);
  const [selectedPackagingType, setSelectedPackagingType] = useState<any>('');
  const [selectedSterilizationType, setSelectedSterilizationType] =
    useState<any>('');
  const [show, setShow] = useState<any>(false);

  useEffect(() => {
    if (data != undefined) {
      setSupplierId(data.supplierId);
      setProductSubcategoryId(data.productSubcategoryId);
      setPropertyId(data.propertyId);
      setSelectedPackagingType(data.packagingType);
      setProductCode(data.productCode);
      setNameEng(data.nameEng);
      setNameLocal(data.nameLocal);
      setDescriptionEng(data.descriptionEng);
      setDescriptionLocal(data.descriptionLocal);
      setNotes(data.notes);
      setLotNumber(data.lotNumber);
      setSerialNumber(data.serialNumber);
      setWeight(data.weight);
      setQuantity(data.quantity);
      setPrice(data.price);
      setProductCost(data.productCost);
      setSelectedSupplier(data.selectedSupplier);
      setCleaningTypeId(data.cleaningTypeId);
      setSterilizationNotes(data.sterilizationNotes);
      setFileName(data.fileName);
      setFile(data.file);
      setUserId(data.userId);
      setSelectedSterilizationType(data.sterilizationTypeId);
      setSelectedProductSubcategory(data.productSubcategoryId);
      setSelectedSupplierId(data.supplierId);
      setProductTypeId(data.productTypeId);
    }
  }, [data]);
  useEffect(() => {
    console.log(productTypeId);
  }, [data]);
  const propertyQuery = useQuery('properties', fetchProperties);

  const supplierQuery = useQuery('suppliers', fetchSuppliers);

  const productSubategoriesQuery = useQuery(
    'productSubategories',
    fetchProductSubcategories
  );

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
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


  useEffect(() => {
    if (sterilizationTypeQuery.data != undefined) {
      setSterilizationType(sterilizationTypeQuery.data.data);
      setSelectedSterilizationType(
        sterilizationTypeQuery.data.data[0].sterilizationTypeId
      );
    }
  }, [sterilizationTypeQuery.data]);

  useEffect(() => {
    if (propertyQuery.data != undefined) {
      setProperties(propertyQuery.data.data);
      //setPropertyId(propertyQuery.data.data.propertyId);
    }
  }, [propertyQuery.data]);

  useEffect(() => {
    if (supplierQuery.data != undefined) {
      setSuppliers(supplierQuery.data.data);
      setSupplierId(supplierQuery.data.data.supplierId);
    }
  }, [supplierQuery.data]);

  useEffect(() => {
    if (productSubategoriesQuery.data != undefined) {
      setProductSubcategories(productSubategoriesQuery.data.data);
      setProductSubcategoryId(
        productSubategoriesQuery.data.data.productSubcategoryId
      );
    }
  }, [productSubategoriesQuery.data]);


  const handleSubmit = async () => {
    const toSubmit = {
      productTypeId,
      nameEng,
      nameLocal,
      descriptionEng,
      descriptionLocal,
      notes,
      sterilizationNotes,
      weight,
      propertyId,
      quantity,
      lotNumber,
      serialNumber,
      productCost,
      productCode,
      price,
      supplierId: selectedSupplierId,
      SterilizationTypeId: selectedSterilizationType,
      cleaningTypeId,
      productSubcategoryId: selectedProductSubcategory,
      packagingType: selectedPackagingType,
      file,
      userId,
    };
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productType',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  console.log(selectedSterilizationType);

  return (
    <>
      <div className="p-8">
        <div className="w-full flex flex-col mt-2">
          <div className="flex w-full justify-between">
            <div className="w-full mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                General
              </div>
              <div className="p-4 flex">
                <label className="p-2 font-semibold w-1/6">
                  Product Category:
                </label>
                <select
                  className="rounded-md w-full"
                  value={selectedProductSubcategory}
                  onChange={(event) => {
                    setSelectedProductSubcategory(event.target.value);
                  }}
                >
                  {productSubcategories.map((element: any) => {
                    return (
                      <option
                        key={element.productSubcategoryId}
                        value={element.productSubcategoryId}
                      >
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
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
                      onChange={(event) => {
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
                      onChange={(event) => {
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
                      onChange={(event) => {
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
                      onChange={(event) => {
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
                    onChange={(event) => {
                      setProductCode(event.target.value);
                    }}
                  />
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Notes:</label>
                  <textarea
                    value={notes}
                    className="w-full rounded-md h-full"
                    onChange={(event) => {
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
                      onChange={(event) => {
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
                      onChange={(event) => {
                        setSerialNumber(event?.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Weight(gr)</label>
                    <input
                      type="number"
                      min="0"
                      step=".01"
                      className="rounded-md w-full "
                      value={weight}
                      onChange={(event) => {
                        setWeight(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Property</label>
                  <select
                    className="rounded-md  w-full"
                    value={propertyId}
                    onChange={(event) => {
                      setPropertyId(event.target.value);
                    }}
                  >
                    {properties.map((element: any) => {
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Cost Management
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="font-semibold">Packaging Type</label>
                  <select
                    className="rounded-md w-full"
                    value={selectedPackagingType}
                    onChange={(event: any) => {
                      setSelectedPackagingType(event.target.value);
                    }}
                  >
                    <option value="Package">Package</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="">
                    <label className="font-semibold">Price(MKD)</label>
                    <input
                      type="text"
                      className="rounded-md w-full"
                      value={price}
                      onChange={(event) => {
                        setPrice(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Product Cost</label>
                    <input
                      type="number"
                      className="rounded-md w-full"
                      value={productCost}
                      onChange={(event) => {
                        setProductCost(event.target.value);
                      }}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Supplier</label>
                    <select
                      className="rounded-md w-full"
                      value={selectedSupplierId}
                      onChange={(event) => {
                        setSelectedSupplierId(event.target.value);
                      }}
                    >
                      {suppliers.map((element: any) => {
                        return (
                          <option
                            key={element.SupplierId}
                            value={element.SupplierId}
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
            <div className="flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                Sterilization
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="font-semibold">Sterilization Type</label>
                  <select
                    className="rounded-md w-full"
                    value={selectedSterilizationType}
                    onChange={(event: any) => {
                      setSelectedSterilizationType(event.target.value);
                    }}
                  >
                    {sterilizationType.map((element: any) => {
                      return (
                        <option
                          value={element.sterilizationTypeId}
                          key={element.sterilizaitonTypeId}
                        >
                          {element.nameEng}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="flex justify-between">
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      checked={cleaningTypeId === 1}
                      onClick={() => {
                        setCleaningTypeId(1);
                      }}
                      className="m-1"
                    />
                    <label className="font-semibold">Ultrasound</label>
                  </div>
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      checked={cleaningTypeId === 2}
                      className="m-1"
                      onClick={() => {
                        setCleaningTypeId(2);
                      }}
                    />
                    <label className="font-semibold">Manual</label>
                  </div>
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      className="m-1"
                      checked={cleaningTypeId === 3}
                      onClick={() => {
                        setCleaningTypeId(3);
                      }}
                    />
                    <label className="font-semibold">Other</label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Sterilization Notes</label>
                  <textarea
                    className="w-full rounded-md"
                    value={sterilizationNotes}
                    onChange={(event) => {
                      setSterilizationNotes(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gray-100">
                File
              </div>
              <div className="p-4">
                <label className="font-semibold mr-2">Product Image:</label>
                <input
                  onChange={(event: any) => {
                    setFile(event.target.files[0]);
                  }}
                  type="file"
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-900 text-white font-semibold p-2 rounded-md"
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

const fetchProperties = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/property');
};

const fetchSuppliers = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier');
};

const fetchProductSubcategories = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productSubcategories'
  );
};

export default EditProductTypeDetails;
