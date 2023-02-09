import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

const InitializeDeposit: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [operationRoomId, setOperationRoomId] = useState<number>();
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const depositQuery = useQuery('fetchdeposits', fetchDeposits);
  const productTypesQuery = useQuery(
    'fetchAllProductTypes',
    fetchAllProductTypes,
    { refetchOnWindowFocus: false }
  );

  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [deposits, setDeposits] = useState<any[]>([]);
  const [city, setCity] = useState<any>();
  const [hospital, setHospital] = useState<any>();
  const [clinic, setClinic] = useState<any>();
  const [operationRoom, setOperationRoom] = useState<any>();
  const [selectedDeposit, setSelectedDeposit] = useState<number>(0);
  const [selectedProductTypes, setSelectedProductTypes] = useState<any[]>([]);
  const [notSelectedProductTypes, setNotSelectedProductTypes] = useState<any[]>([]);
  const [selectedProductSubcategory, setSelectedProductSubcategory] =
    useState<any>(undefined);
  const [selectedProductsFiltered, setSelectedProductsFiltered] = useState<any>(
    []
  );
  const [productSubcategories, setProductSubcategories] = useState<any[]>([]);

  const fetchProductSubcategories = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Product/productSubcategories`
    );
  };

  const productSubcategoriesQuery = useQuery(
    'fetchProductSubcategories',
    fetchProductSubcategories,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (productSubcategoriesQuery.data != undefined) {
      setProductSubcategories(productSubcategoriesQuery.data?.data);
    }
  }, [productSubcategoriesQuery.data]);

  useEffect(() => {
    if (productSubcategoriesQuery.data != undefined) {
      setProductSubcategories(productSubcategoriesQuery.data.data);
    }
  }, [productSubcategoriesQuery.data]);

  useEffect(() => {
    if (selectedProductSubcategory && selectedProductSubcategory != 0) {
      setSelectedProductsFiltered(
        notSelectedProductTypes.filter(
          (element: any) =>
            element.productSubcategoryId == selectedProductSubcategory
        )
      );
    } else {
      setSelectedProductsFiltered(notSelectedProductTypes);
    }
  }, [selectedProductSubcategory, notSelectedProductTypes]);

  useEffect(() => {
    if (depositQuery.data != undefined && depositQuery.data.data.length != 0) {
      setSelectedDeposit(depositQuery.data.data[0].DepositId);
      setCity(depositQuery.data.data[0].City);
      setHospital(depositQuery.data.data[0].Hospital);
      setClinic(depositQuery.data.data[0].Clinic);
      setOperationRoom(depositQuery.data.data[0].OperationRoom);
      setDeposits(depositQuery.data.data);
    }
  }, [depositQuery.data]);

  useEffect(() => {
    if (productTypes != undefined) {
      setNotSelectedProductTypes(productTypes);
    }
  }, [productTypes]);

  useEffect(() => {
    if (depositQuery.data != undefined) {
      setDeposits(depositQuery.data?.data);
    }
  }, [depositQuery.data]);

  useEffect(() => {
    if (productTypesQuery.data != undefined) {
      setProductTypes(productTypesQuery.data.data);
    }
  }, [productTypesQuery.data]);

  useEffect(() => {
    const newDeposit = deposits.find((element) => {
      return element.DepositId == selectedDeposit;
    });
    console.log(newDeposit);

    setCity(newDeposit?.City);
    setHospital(newDeposit?.Hospital);
    setClinic(newDeposit?.Clinic);
    setOperationRoom(newDeposit?.OperationRoom);
    if (
      newDeposit?.OperationRoom == null ||
      newDeposit?.Clinic == null ||
      newDeposit?.Hospital == null
    ) {
      setOperationRoom('/');
      setClinic('/');
      setHospital('/');
    }
  }, [selectedDeposit]);

  const handleRemove = (productTypeId: number) => {
    const index = notSelectedProductTypes.findIndex((productType)=>productType.ProductTypeId===productTypeId)
    var removed = selectedProductTypes[index];

    var productTypes2 = selectedProductTypes?.filter(
      (element: any, i: number) => {
        return i != index;
      }
    );
    setSelectedProductTypes(productTypes2);
  };

  const handleAdd = (productTypeId: number) => {
    const index = notSelectedProductTypes.findIndex((productType)=>productType.productTypeId===productTypeId)
    var toAdd = notSelectedProductTypes[index];

    if (
      index===-1
    ) {
      return;
    }
    var element = {
      ProductTypeId: toAdd['productTypeId'],
      ProductTypeName: toAdd['nameEng'],
      ProductCode: toAdd['productCode'],
      Minimum: 1,
      Maximum: 1,
    };
    setSelectedProductTypes([...selectedProductTypes, element]);
  };

  const handleSubmit = async () => {
    if (selectedProductTypes.length === 0) {
      setErrorMessage('Cannot initialize with empty cart');
      setShowError(true);
      return;
    }
    const toSubmit = {
      depositId: selectedDeposit,
      productTypes: selectedProductTypes,
      operationRoomId,
    };
    try {
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
        '/Deposit/initializeOperationRoomDeposit2',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };

  const changeMax = (value: any, index: number) => {
    var productTypes2 = [...selectedProductTypes];
    productTypes2[index].Maximum = value;
    setSelectedProductTypes(productTypes2);
  };

  const changeMin = (value: any, index: number) => {
    var productTypes2 = [...selectedProductTypes];
    productTypes2[index].Minimum = value;
    setSelectedProductTypes(productTypes2);
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  const selectedColumns = [
    {
      Header: 'Product Code',
      accessor: 'ProductCode',
    },
    {
      Header: 'Product Name',
      accessor: 'ProductTypeName',
    },
    {
      Header: 'Minimum',
      Cell: ({ cell }) => {
        return (
          <input
            type="number"
            className="rounded-md"
            onBlur={(e: any) => {
              if (e.target.value == '' || e.target.value < 1) {
                changeMin(cell.row.original.Minimum, cell.row.id);
              } else {
                changeMin(e.target.value, cell.row.id);
              }
            }}
            defaultValue={cell.row.original.Minimum}
          />
        );
      },
    },
    {
      Header: 'Maximum',
      Cell: ({ cell }) => {
        return (
          <input
            type="number"
            className="rounded-md"
            onBlur={(e: any) => {
              if (e.target.value == '' || e.target.value < 1) {
                changeMax(cell.row.original.Maximum, cell.row.id);
              } else {
                changeMax(e.target.value, cell.row.id);
              }
            }}
            defaultValue={cell.row.original.Maximum}
          />
        );
      },
    },
    {
      accessor:"ProductTypeId",
      Cell: ({ cell }) => {
        return (
          <button
            className="pb-2 p-2 px-6 text-lg font-semibold bg-red-500 rounded-md text-white"
            onClick={(e) => handleRemove(cell.value)}
          >
            x
          </button>
        );
      },
    },
  ];

  const notSelectedColumns = [
    {
      Header: 'Product Code',
      accessor: 'productCode',
    },
    {
      Header: 'Product Name',
      accessor: 'nameEng',
    },
    {
      Header:'Product Description',
      accessor:'descriptionEng'
    },
    {
      accessor:"productTypeId",
      Cell: ({ cell }) => {
        return (
          <button
            className="p-2 px-4 font-semibold text-xl bg-blue-500 rounded-md text-white"
            onClick={(e) => handleAdd(cell.value)}
          >
            +
          </button>
        );
      },
    },
  ];

  if (deposits.length == 0) {
    return (
      <div className="text-center p-16 font-semibold">
        All Deposits have been initialized
      </div>
    );
  } else {
    return (
      <>
        <div className="p-4">
          <div className="flex justified-between">
            <div className="w-1/2 h-full flex flex-col mt-2 mr-8 border-2 rounded-md shadow-md mb-4">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Deposit For Initializing
              </div>
              <div className="p-4">
                <select
                  value={selectedDeposit}
                  className="w-full rounded-md"
                  onChange={(event: any) => {
                    setSelectedDeposit(event.target.value);
                  }}
                >
                  <option value={0}>Select a deposit...</option>
                  {deposits.map((element: any, index: number) => {
                    return (
                      <option value={element.DepositId}>
                        {element.DepositCode}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="w-1/2 h-full flex flex-col mt-2 mr-8 border-2 rounded-md shadow-md mb-4">
              <div className="font-semibold text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
                Cost Center
              </div>
              <div className="p-4">
                <div className="mt-4">
                  <label>City:</label>
                  <input
                    className="rounded-md w-full bg-gray-100"
                    type="text"
                    value={city}
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label>Hospital:</label>
                  <input
                    className="rounded-md w-full bg-gray-100"
                    type="text"
                    value={hospital}
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label>Clinic:</label>
                  <input
                    className="rounded-md w-full bg-gray-100"
                    type="text"
                    value={clinic}
                    readOnly
                  />
                </div>
                <div className="mt-4">
                  <label>Operation Room:</label>
                  <input
                    className="rounded-md w-full bg-gray-100"
                    type="text"
                    value={operationRoom}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-left text-md font-semibold font-play pt-4 px-4">
            Selected Products
          </div>
          <BaseTable columns={selectedColumns} data={selectedProductTypes} />
          <div className="my-4 w-full h-1/2">
            <div className="flex flex-col text-left text-md font-semibold font-play pt-4 px-4">
              All Products
            </div>
            <div className="w-1/2 pt-5 pl-3">
              <select
                className="rounded-md bg-gray-50"
                value={selectedProductSubcategory}
                onChange={(event: any) => {
                  setSelectedProductSubcategory(event.target.value);
                }}
              >
                <option value={0} className="text-gray-500">
                  Select a category...
                </option>
                {productSubcategories?.map((element: any) => {
                  return (
                    <option
                      key={element.productSubcategoryId}
                      className="bg-white"
                      value={element.productSubcategoryId}
                    >
                      {element.nameEng}
                    </option>
                  );
                })}
              </select>
            </div>
            <BaseTable
              columns={notSelectedColumns}
              data={selectedProductsFiltered}
            />

          </div>
          <button
            onClick={() => {
              handleSubmit();
            }}
            className="w-full p-4 bg-gradient-top-bottom font-play rounded-md text-white font-semibold"
          >
            Submit
          </button>
        </div>
        {showError ? (
          <GeneralFailPopup
            errorMessage={errorMessage}
            setShow={setShowError}
          />
        ) : (
          ''
        )}
        {showSuccess ? (
          <GeneralSuccessPopup
            successMessage={'Successfully initialized deposit'}
            buttonLink="/"
            buttonMessage={'OK'}
            onClick={onClick}
          />
        ) : (
          ''
        )}
      </>
    );
  }
};

const fetchDeposits = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/uninitialized-deposits'
  );
};

const fetchAllProductTypes = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productTypes'
  );
};

export default InitializeDeposit;
