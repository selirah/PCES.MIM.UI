import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { ENV } from '../../../env';

interface Props {
  data?: any;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ProductSubcategory: React.FC<Props> = (props: Props) => {
  const { data, onClick } = props;
  const [submission, setSubmission] = useState<any>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const fetchCategories = async () => {
    return await axios.get(
      ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productCategories'
    );
  };

  const categoryQuery = useQuery('fetchCategories', fetchCategories);

  const [category, setCategory] = useState<any[]>([]);

  useEffect(() => {
    if (categoryQuery.data != undefined) {
      setCategory(categoryQuery.data.data);
      if (submission == undefined) {
        setSubmission({
          productSubcategoryId: submission?.productSubcategoryId,
          nameEng: submission?.nameEng,
          descriptionEng: submission?.descriptionEng,
          nameLocal: submission?.nameLocal,
          descriptionLocal: submission?.descriptionLocal,
          productCategoryId: categoryQuery.data.data[0].productCategoryId,
        });
      }
    }
  }, [categoryQuery.data]);

  useEffect(() => {
    if (data != undefined) {
      setSubmission(data);
    }
  }, [data]);

  const handleSubmit = async () => {
    console.log(submission);

    try {
      if (submission?.productSubcategoryId == undefined) {
        setSuccessMessage('Successfully created a Subcategory');
        await axios.post(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/subcategory',
          submission
        );
      } else {
        setSuccessMessage('Successfully updated a Product Subcategory');
        await axios.put(
          ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/UpdateProductSubcategory',
          submission
        );
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
          <label className="w-1/2 text-left font-semibold p-2">Name ENG:</label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameEng}
            onChange={(event) => {
              setSubmission({
                productSubcategoryId: submission?.productSubcategoryId,
                nameEng: event.target.value,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                productCategoryId: submission?.productCategoryId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Name Local:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.nameLocal}
            onChange={(event) => {
              setSubmission({
                productSubcategoryId: submission?.productSubcategoryId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: event.target.value,
                descriptionLocal: submission?.descriptionLocal,
                productCategoryId: submission?.productCategoryId,
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
            value={submission?.descriptionEng}
            onChange={(event) => {
              setSubmission({
                productSubcategoryId: submission?.productSubcategoryId,
                nameEng: submission?.nameEng,
                descriptionEng: event.target.value,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                productCategoryId: submission?.productCategoryId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Description Local:
          </label>
          <input
            className="w-1/2 rounded-md"
            value={submission?.descriptionLocal}
            onChange={(event) => {
              setSubmission({
                productSubcategoryId: submission?.productSubcategoryId,
                nameEng: submission?.nameEng,
                descriptionEng: submission?.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: event.target.value,
                productCategoryId: submission?.productCategoryId,
              });
            }}
            type="text"
          />
        </div>
        <div className="flex justify-between mb-3">
          <label className="w-1/2 text-left font-semibold p-2">
            Product Category:
          </label>
          <select
            className="w-1/2 rounded-md bg-gray-50"
            value={submission?.productCategoryId}
            onChange={(event: any) => {
              setSubmission({
                productSubcategoryId: submission?.productSubcategoryId,
                nameEng: submission?.nameEng,
                descriptionEng: submission.descriptionEng,
                nameLocal: submission?.nameLocal,
                descriptionLocal: submission?.descriptionLocal,
                productCategoryId: event.target.value,
              });
            }}
          >
            {category.map((element: any) => {
              return (
                <option value={element.productCategoryId}>
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

export default ProductSubcategory;
