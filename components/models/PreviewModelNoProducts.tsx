import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PreviewModelDetails from './PreviewModelDetails';
import { ENV } from '../../env';
import PreviewModelDetailsNoProducts from './PreviewModelDetailsNoProducts';

interface Props {
  setModelId: string | string[] | undefined;
}
const PreviewModelNoProducts: React.FC<Props> = ({ setModelId }: Props) => {
  const query = useQuery(
    ['editmodels', { setModelId: setModelId }],
    //@ts-ignore
    fetchModelsById,
    { enabled: setModelId != undefined, refetchOnWindowFocus: false }
  );
  const [data, setData] = useState<string>();



  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);


  return query.isLoading ? (
    <h1>Loading...</h1>
  ) : query.isError ? (
    <h1>Error</h1>
  ) : (
    <div>
      <div className="mx-2">
        <PreviewModelDetailsNoProducts data={data}/>
      </div>
    </div>
  );
};
export default PreviewModelNoProducts;

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
