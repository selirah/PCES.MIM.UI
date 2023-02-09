import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PreviewSetDetails from './PreviewSetDetails';
import { ENV } from '../../env';

interface Props {
  setId: string | string[] | undefined;
}
const PreviewSet: React.FC<Props> = ({ setId }: Props) => {
  const query = useQuery(
    ['reviewset', { setId: setId }],
    //@ts-ignore
    fetchSetById,
    { enabled: setId != undefined, refetchOnWindowFocus: false }
  );
  const [data, setData] = useState<string>();

  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return query.isLoading ? (
    <h1>Loading...</h1>
  ) : query.isError ? (
    <h1>Error</h1>
  ) : (
    <div>
      <div className="mx-2">
        <PreviewSetDetails data={data} />
      </div>
    </div>
  );
};
export default PreviewSet;

const fetchSetById = async (params: Params) => {
  const [_, { setId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/Set/setBySetId?setId=${setId}`
  );
  return result;
};

// const fetchCurrentProductTypes = async (params: Params) => {
//   const [_, { setId }] = params.queryKey;
//   const result = await axios.get(
//     ENV.NEXT_PUBLIC_API_ENDPOINT +
//       `/SetModel/setModelByIdWithProductTypes?setId=${setId}`
//   );
//   return result;
// };

interface Params {
  queryKey: [string, { setId: number }];
}
