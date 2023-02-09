import React, { useEffect, useState } from 'react';

import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import axios from 'axios';
import { ENV } from '../../../env';
import { useQuery } from 'react-query';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Supplier: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;

  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [productCategories, setProductCategories] = useState<any>([]);

  
  const fetchProductCategories = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productSubcategories'
    );
  };

  
  const productCategoriesQuery = useQuery(
    'fetchProductCategories',
    fetchProductCategories,
    { refetchOnWindowFocus: false }
  );


  useEffect(() => {
    if (productCategoriesQuery.data != undefined) {
      setProductCategories(productCategoriesQuery.data.data);
      if (submission == undefined) {
        setSubmission({
          SupplierCode: submission?.SupplierCode,
          SupplierId: submission?.SupplierId,
          NameEng: submission?.NameEng,
          DescriptionEng: submission?.DescriptionEng,
          Address: submission?.Address,
          AccountNumber: submission?.AccountNumber,
          Email: submission?.Email,
          VATNo: submission?.VATNo,
          ProductSubcategoryId: productCategoriesQuery.data?.data[0].ProductSubcategoryId,
        });
      }
    }
  }, [productCategoriesQuery.data]);


  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log(submission);
    try {
      if (submission?.SupplierId == undefined) {
        setSuccessMessage('Successfully created supplier');
        await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier', submission);
      } else {
        setSuccessMessage('Successfully updated supplier');
        await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Supplier', submission);
      }
      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };
  return (
    <>
      <div className="w-full text-center">
      <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Supplier code:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.SupplierCode}
            onChange={(event) => {
              setSubmission({
                SupplierCode: event.target.value,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Name ENG:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.NameEng}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: event.target.value,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Description ENG:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.DescriptionEng}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: event.target.value,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Address:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.Address}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: event.target.value,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Account Number:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.AccountNumber}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: event.target.value,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">Email:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.Email}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: event.target.value,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Vat Number:
          </label>
          <input
            className="w-1/2 rounded-md"
            type="number"
            value={submission?.VATNo}
            onChange={(event) => {
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: event.target.value,
                ProductSubcategoryId: submission?.ProductSubcategoryId
              });
            }}
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Product Category:
          </label>
          <select
            className="w-1/2 rounded-md bg-gray-50"
            value={submission?.ProductSubcategoryId}
            onChange={(event: any) => {
              console.log(event.target.value)
              setSubmission({
                SupplierCode: submission?.SupplierCode,
                SupplierId: submission?.SupplierId,
                NameEng: submission?.NameEng,
                DescriptionEng: submission?.DescriptionEng,
                Address: submission?.Address,
                AccountNumber: submission?.AccountNumber,
                Email: submission?.Email,
                VATNo: submission?.VATNo,
                ProductSubcategoryId: event.target.value
              });
            }}
          >
            {productCategories.map((element: any) => {
              return (
                <option value={element.productSubcategoryId}>
                  {element.nameEng}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={handleSubmit}
          className="text-white font-semibold bg-blue-900 rounded-md p-2 w-full"
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
          buttonLink={'/'}
          buttonMessage={'Ok'}
          successMessage={successMessage}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Supplier;
