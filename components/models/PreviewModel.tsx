import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PreviewModelDetails from './PreviewModelDetails';
import { ENV } from '../../env';

interface Props {
  setModelId: string | string[] | undefined;
}
const PreviewModel: React.FC<Props> = ({ setModelId }: Props) => {
  const query = useQuery(
    ['editmodels', { setModelId: setModelId }],
    //@ts-ignore
    fetchModelsById,
    { enabled: setModelId != undefined, refetchOnWindowFocus: false }
  );
  const [data, setData] = useState<string>();

  const queryProducts = useQuery(
    ['reviewproductmodels', { setModelId: setModelId }],
    //@ts-ignore
    fetchCurrentProductTypes,
    { enabled: setModelId != undefined, refetchOnWindowFocus: false }
  );

  const [selectedProductTypes, setSelectedProductTypes] = useState<any[]>([]);

  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  useEffect(() => {
    if (queryProducts.data != undefined) {
      setSelectedProductTypes(queryProducts.data.data);
    }
  }, [queryProducts.data]);

  return query.isLoading ? (
    <h1>Loading...</h1>
  ) : query.isError ? (
    <h1>Error</h1>
  ) : (
    <div>
      <div className="mx-2">
        <PreviewModelDetails data={data} currentData={selectedProductTypes} />
      </div>
    </div>
  );
};
export default PreviewModel;

const fetchModelsById = async (params: Params) => {
  const [_, { setModelId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/SetModel/setModelById?setModelId=${setModelId}`
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
