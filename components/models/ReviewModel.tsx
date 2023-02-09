import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';
import 'bootstrap/dist/css/bootstrap.min.css';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import RevisionModelForm from './RevisionModelForm';
import DuplicateAndRevisionModelProductTypes from './DuplicateAndRevisionModelProductTypes';

interface Props {
  setModelId: string | string[] | undefined;
}
const ReviewModel: React.FC<Props> = ({ setModelId }: Props) => {
  const [submissionData, setSubmissionData] = useState<any>({});
  const [selectedProductTypes, setSelectedProductTypes] = useState<any[]>([]);
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data: session, status } = useSession();

  const [Show, setShow] = useState<any>(false);

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };
  const [userId, setUserId] = useState<number>();

  useEffect(() => {
    if (session != undefined) {
      setUserId(session.user.userDTO.userId);
    }
  }, [session]);

  const query = useQuery(
    ['editmodels', { setModelId: setModelId }],
    //@ts-ignore
    fetchModelsById,
    { enabled: setModelId != undefined, refetchOnWindowFocus: false }
  );

  const queryProducts = useQuery(
    ['reviewproductmodels', { setModelId: setModelId }],
    //@ts-ignore
    fetchCurrentProductTypes,
    { enabled: setModelId != undefined, refetchOnWindowFocus: false }
  );

  useEffect(() => {
    if (query.data != undefined) {
      setSubmissionData(query.data.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (queryProducts.data != undefined) {
      setSelectedProductTypes(queryProducts.data.data);
    }
  }, [queryProducts.data]);
  const handleSubmit = async () => {
    const toSubmit = {
      modelId: setModelId,
      productTypes: selectedProductTypes,
      userId: session.user.userDTO.userId,
    };
    try {
      await axios.put(
        ENV.NEXT_PUBLIC_API_ENDPOINT +
          '/SetModel/updateSetModelWithProductTypes',
        toSubmit
      );
      setShowSuccess(true);
    } catch (error) {
      setErrorMessage('Something went wrong. Try again');
      setShowError(true);
    }
  };
  console.log(selectedProductTypes);
  return (
    <>
      <div className="screen-background">
        <div className="p-4">
          <RevisionModelForm data={submissionData} />
          <div>
            <DuplicateAndRevisionModelProductTypes
              dataProducts={queryProducts.data?.data}
              setData={setSelectedProductTypes}
            />
          </div>
          <button
            className="w-full h-12 mt-4 font-semibold text-white bg-gradient-button rounded-md"
            onClick={handleSubmit}
          >
            Review Model
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
            buttonLink={'/'}
            buttonMessage={'Ok'}
            successMessage={'Successfully edited model'}
            onClick={onClick}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
};
export default ReviewModel;

const fetchModelsById = async (params: Params) => {
  const [_, { setModelId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/SetModel/setModelById?setModelId=${setModelId}`
  );
  return result;
};

const fetchCurrentProductTypes = async (params: Params) => {
  const [_, { setModelId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/SetModel/setModelByIdWithProductTypes?setModelId=${setModelId}`
  );
  return result;
};
interface Params {
  queryKey: [string, { setModelId: number }];
}
