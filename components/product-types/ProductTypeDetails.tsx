import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import react, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ENV } from '../../env';

interface Props {
  data: any;
}

const ProductTypeDetails: React.FC<Props> = (props: Props) => {
  const { data } = props;
  const [sterilizationType, setSterilizationType] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [productSubcategories, setProductSubcategories] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyId, setPropertyId] = useState<number>();
  const [productSubcategoryId, setProductSubcategoryId] = useState<number>();
  const [supplierId, setSupplierId] = useState<number>();
  const [selectedSupplierId, setSelectedSupplierId] = useState<number>();
  const [productCode, setProductCode] = useState<string>('');
  const [nameEng, setNameEng] = useState<string>('');
  const [nameLocal, setNameLocal] = useState<string>('');
  const [descriptionEng, setDescriptionEng] = useState<string>('');
  const [descriptionLocal, setDescriptionLocal] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [lotNumber, setLotNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [weight, setWeight] = useState<number>();
  const [quantity, setQuantity] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [productCost, setProductCost] = useState<number>();
  const [selectedSupplier, setSelectedSupplier] = useState<string>('');
  const [cleaningTypeId, setCleaningTypeId] = useState<number>();
  const [sterilizationNotes, setSterilizationNotes] = useState<string>('');
  const [userId, setUserId] = useState<number>();
  const [sterilizaitonTypeId, setSterilizationTypeId] = useState<number>();
  const [selectedProductSubcategory, setSlectedProductSubcategory] =
    useState<number>();
  const [productTypeId, setProductTypeId] = useState<number>();
  const [fileName, setFileName] = useState<string | undefined>(undefined);
  const [file, setFile] = useState<any>();

  const [base64Image, setBase64Image] = useState<string>('')

  useEffect(() => {
    console.log(data)
    if (data != undefined) {
      setSupplierId(data.supplierId);
      setProductSubcategoryId(data.productSubcategoryId);
      setPropertyId(data.propertyId);
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
      setSterilizationTypeId(data.sterilizationTypeId);
      setSlectedProductSubcategory(data.productSubcategoryId);
      setSelectedSupplierId(data.supplierId);
      setProductTypeId(data.productTypeId);
      mutate(["fetchFile", { objectId: data.productImageMongoId }])
    }
  }, [data]);

  const propertyQuery = useQuery('properties', fetchProperties);

  const supplierQuery = useQuery('suppliers', fetchSuppliers);

  const productSubategoriesQuery = useQuery(
    'productSubategories',
    fetchProductSubcategories
  );

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

  const fetchFileData = async (props) => {
    const [_, { objectId }] = props
    console.log(objectId)
    var response =  await axios.post(
      `${ENV.NEXT_PUBLIC_API_ENDPOINT}/File/download`, { objectId }
    );
    return response.data
  };
  const { mutate, isLoading } = useMutation(fetchFileData, {
    onSuccess: data => {
      setBase64Image(data)
    },
    onError: () => {
      console.log("error")
    }
  })


  useEffect(() => {
    if (sterilizationTypeQuery.data != undefined) {
      setSterilizationType(sterilizationTypeQuery.data.data);
    }
  }, [sterilizationTypeQuery.data]);

  useEffect(() => {
    if (propertyQuery.data != undefined) {
      setProperties(propertyQuery.data.data);
    }
  }, [propertyQuery.data]);

  useEffect(() => {
    if (supplierQuery.data != undefined) {
      setSuppliers(supplierQuery.data.data);
    }
  }, [supplierQuery.data]);

  useEffect(() => {
    if (productSubategoriesQuery.data != undefined) {
      setProductSubcategories(productSubategoriesQuery.data.data);
    }
  }, [productSubategoriesQuery.data]);

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
                  className="rounded-md bg-gray-50 w-full"
                  value={selectedProductSubcategory}
                  disabled
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Product Details
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 gap-8 mb-4">
                  <div className="">
                    <label className="font-semibold">Product Name Eng</label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={nameEng}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Product Name Local</label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={nameLocal}
                      readOnly
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
                      className="rounded-md w-full bg-gray-100"
                      value={descriptionEng}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">
                      Product Description Local
                    </label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={descriptionLocal}
                      readOnly
                    ></input>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Product Code:</label>
                  <input
                    value={productCode}
                    type="text"
                    className="w-full rounded-md bg-gray-100"
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Notes:</label>
                  <textarea
                    value={notes}
                    className="w-full rounded-md h-full bg-gray-100"
                    readOnly
                  />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="">
                    <label className="font-semibold">Lot Number</label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={lotNumber}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Serial Number</label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={serialNumber}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Weight(gr)</label>
                    <input
                      type="number"
                      className="rounded-md w-full bg-gray-100"
                      value={weight}
                      readOnly
                    ></input>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="font-semibold">Property</label>
                  <select
                    disabled
                    className="rounded-md bg-gray-100 w-full"
                    value={propertyId}
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
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Cost Management
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="font-semibold">Packaging Type</label>
                  <select className="rounded-md bg-gray-100 w-full" disabled>
                    <option value={0}>Unit</option>
                    <option value={1}>Package</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="">
                    <label className="font-semibold">Price(MKD)</label>
                    <input
                      type="text"
                      className="rounded-md w-full bg-gray-100"
                      value={price}
                      readOnly
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Product Cost</label>
                    <input
                      readOnly
                      type="number"
                      className="rounded-md w-full bg-gray-100"
                      value={productCost}
                    ></input>
                  </div>
                  <div className="">
                    <label className="font-semibold">Supplier</label>
                    <select
                      className="rounded-md bg-gray-100 w-full"
                      value={selectedSupplierId}
                      disabled
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
            <div className={`flex flex-col mt-2 border-2 rounded-md shadow-md ${selectedProductSubcategory!==3006 ? 'opacity-50 hover:cursor-not-allowed':''}`}>
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Sterilization
              </div>
              <div className="p-4">
                <div className="mb-4">
                  <label className="font-semibold">Sterilization Type</label>
                  <select
                    disabled
                    className="rounded-md bg-gray-100 w-full"
                    value={sterilizaitonTypeId}
                  >
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
                      type="radio"
                      name="cleaning"
                      checked={cleaningTypeId === 1}
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
                    />
                    <label className="font-semibold">Manual</label>
                  </div>
                  <div className="flex mr-4">
                    <input
                      type="radio"
                      name="cleaning"
                      className="m-1"
                      checked={cleaningTypeId === 3}
                    />
                    <label className="font-semibold">Other</label>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="font-semibold">Sterilization Notes</label>
                  <textarea
                    className="w-full rounded-md bg-gray-100"
                    value={sterilizationNotes}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-2 border-2 rounded-md shadow-md">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                File
              </div>
              <div className="p-4">
                <div className="p-4 text-center font-play">
                  {base64Image ? <img src={`data:image/jpeg;base64,${base64Image}`} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ProductTypeDetails;
