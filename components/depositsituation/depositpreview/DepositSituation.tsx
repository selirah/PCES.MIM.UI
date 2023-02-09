import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../../env';

interface Props {
  data: any;
  depositId: any;
}

const DepositSituation: React.FC<Props> = ({ data, depositId }: Props) => {
  const router = useRouter();
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedSubcategory, setSelectedSubCategory] = useState(undefined);
  const [filteredProductTypes, setFilteredProductTypes] = useState<any[]>([]);
  const [allFilteredProductTypes, setAllFilteredProductTypes] = useState<any[]>(
    []
  );
  const [Show, setShow] = useState<any>(false);

  const [allNotSelectedProductTypes, setAllNotSelectedProductTypes] = useState(
    []
  );

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.push('/depositsituation');
  };

  useEffect(() => {
    setSelectedSubCategory(router.query.subCategoryId);
  }, [router.query]);

  useEffect(() => {
    console.log(selectedSubcategory);
  }, [selectedSubcategory]);

  useEffect(() => {
    if (data != undefined) {
      console.log(data);
      setProductTypes(
        data.filter((element: any) => {
          return element.ProposedQuantity != 0;
        })
      );
    }
  }, [data]);

  const allProductTypes = useQuery('allproducttypes', fetchAllProductTypes, {
    refetchOnWindowFocus: false,
  });

  const MakeRequest = async () => {
    if (productTypes.length != 0) {
      let index = productTypes.findIndex(
        (element: any) => element.ProposedQuantity < 1
      );
      if (index != -1) {
        setErrorMessage(
          'Make sure the quantities are greater than or equal to 1'
        );
        setShowError(true);
        return;
      }
      var objectToSend = {
        DepositId: depositId,
        UserId: 4,
        ProductTypes: productTypes.map((element: any) => {
          return {
            ProductTypeId: element.ProductTypeId,
            Quantity: element.ProposedQuantity,
          };
        }),
      };
      await axios.post(
        ENV.NEXT_PUBLIC_API_ENDPOINT + '/Process/makerequest',
        objectToSend
      );
      setShowSuccess(true);
    } else {
      setErrorMessage('Cannot make a request on an empty cart');
      setShowError(true);
    }
  };

  useEffect(() => {
    if (allProductTypes.data != undefined) {
      setAllNotSelectedProductTypes(allProductTypes.data.data);
    }
  }, [allProductTypes.data]);

  const handleChange = (productTypeId: number, value) => {
    const product = productTypes.find(
      (element: any) => element.ProductTypeId == productTypeId
    );
    if (value < product.Minimum + product.Quantity + 1) {
      if (product.Minimum + product.Quantity == 0) {
        let productTypes2 = [...productTypes];
        productTypes2.find(
          (element: any) => element.ProductTypeId == productTypeId
        ).ProposedQuantity = 1;
        setProductTypes(productTypes2);
      } else {
        let productTypes2 = [...productTypes];
        productTypes2.find(
          (element: any) => element.ProductTypeId == productTypeId
        ).ProposedQuantity = product.Minimum + product.Quantity;
        setProductTypes(productTypes2);
      }
    } else {
      let productTypes2 = [...productTypes];
      productTypes2.find(
        (element: any) => element.ProductTypeId == productTypeId
      ).ProposedQuantity = value;
      setProductTypes(productTypes2);
    }
  };
  const handleRemove = (productTypeId: number) => {
    var productTypes2 = productTypes.filter(
      (element: any) => element.ProductTypeId != productTypeId
    );
    setProductTypes(productTypes2);
  };

  const handleAdd = (productTypeId: number) => {
    var toAdd = allNotSelectedProductTypes.find(
      (element) => element.productTypeId == productTypeId
    );
    var toAddProduct = {
      ProductCode: toAdd['productCode'],
      ProductTypeId: toAdd['productTypeId'],
      ProductTypeName: toAdd['nameEng'],
      ProductSubcategoryId: toAdd['productSubcategoryId'],
      Quantity: '-',
      Minimum: '-',
      Maximum: '-',
      ProposedQuantity: 1,
    };
    const indexCheck = productTypes
      .map((element: any) => {
        return element.ProductTypeId;
      })
      .findIndex((element: any) => {
        return element == toAddProduct.ProductTypeId;
      });
    if (indexCheck == -1) {
      setProductTypes([...productTypes, toAddProduct]);
    } else {
      let products2 = [...productTypes];
      products2[indexCheck].ProposedQuantity =
        parseInt(products2[indexCheck].ProposedQuantity) + 1;
      console.log(products2[indexCheck]);
      setProductTypes(products2);
    }
  };

  const selectedProductsColumns = [
    {
      Header: 'Product Code',
      accessor: 'ProductCode',
    },
    {
      Header: 'Name',
      accessor: 'ProductTypeName',
    },
    {
      Header: 'Current Quantity',
      accessor: 'Quantity',
    },
    {
      Header: 'Maximum',
      accessor: 'Maximum',
    },
    {
      Header: 'Minimum',
      accessor: 'Minimum',
    },
    {
      Header: 'Proposed Quantity',
      Cell: ({ cell }: any) => {
        return (
          <>
            <input
              type="number"
              defaultValue={cell.row.original.ProposedQuantity}
              onBlur={(event) => {
                if (event.target.value == '') {
                  handleChange(
                    cell.row.original.ProductTypeId,
                    cell.row.original.Minimum
                  );
                } else {
                  handleChange(
                    cell.row.original.ProductTypeId,
                    event.target.value
                  );
                }
              }}
              className="rounded-md"
            />
          </>
        );
      },
    },
    {
      Header: 'Remove',
      Cell: ({ cell }: any) => {
        return cell.row.original.Minimum == '-' ? (
          <button
            className="p-2 bg-red-500 text-white w-16 rounded-md font-semibold"
            onClick={(e) => handleRemove(cell.row.original.ProductTypeId)}
          >
            X
          </button>
        ) : (
          <button
            disabled
            className="p-2 bg-gray-400 text-white w-16 rounded-md font-semibold"
          >
            X
          </button>
        );
      },
    },
  ];

  const allProductsColumns = [
    {
      Header: 'Code',
      accessor: 'productCode',
    },
    {
      Header: 'Name',
      accessor: 'nameEng',
    },
    {
      Header: 'Description',
      accessor: 'descriptionEng',
    },
    {
      Header: 'Add',
      Cell: ({ cell }: any) => {
        return (
          <button
            className="p-2 bg-blue-500 text-white rounded-md w-16 font-semibold text-xl"
            onClick={(e) => handleAdd(cell.row.original.productTypeId)}
          >
            +
          </button>
        );
      },
    },
  ];

  return (
    <>
      <label className="font-semibold font-play text-blue-navy p-2">Product Categories:</label>
      <select
        value={selectedSubcategory}
        className="mb-2 rounded-md bg-gray-50"
        onChange={(event: any) => {
          if (event.target.value == 0) {
            setSelectedSubCategory(undefined);
          } else {
            setSelectedSubCategory(event.target.value);
          }
        }}
      >
        <option value={0}>All</option>
        <option value={1}>Hazardous</option>
        <option value={2}>R.O.T.</option>
        <option value={3}>N.W.M.</option>
        <option value={5}>Accessory</option>
        <option value={3006}>Instrument</option>
      </select>
      <div className="mb-4 w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
        <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
          Selected Products
        </div>
        <BaseTable
          data={
            selectedSubcategory
              ? productTypes.filter(
                  (element: any) =>
                    element.ProductSubcategoryId == selectedSubcategory
                )
              : productTypes
          }
          columns={selectedProductsColumns}
        />
      </div>

      <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
        <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
          All Products
        </div>
        <BaseTable
          data={
            selectedSubcategory
              ? allNotSelectedProductTypes.filter(
                  (element: any) =>
                    element.productSubcategoryId == selectedSubcategory
                )
              : allNotSelectedProductTypes
          }
          columns={allProductsColumns}
        />
      </div>

      <div className="mt-8">
        <button
          className="p-4 bg-gradient-top-bottom font-play text-white border-2 rounded-md w-full font-semibold"
          onClick={() => {
            MakeRequest();
          }}
        >
          Generate Proposed Order
        </button>
      </div>
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonMessage={'Back To Deposits'}
          buttonLink={'/depositsituation'}
          successMessage="Request has been made"
          onClick={onClick}
        />
      ) : (
        ''
      )}
      {showError ? (
        <GeneralFailPopup errorMessage={errorMessage} setShow={setShowError} />
      ) : (
        ''
      )}
    </>
  );
};

const fetchAllProductTypes = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productTypes');
};

export default DepositSituation;
