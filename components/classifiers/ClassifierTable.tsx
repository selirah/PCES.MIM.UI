import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  classifier: string;
  hiddenFields: string;
}

const ClassifierTable: React.FC<Props> = ({
  classifier,
  hiddenFields,
}: Props) => {
  const { isLoading, isError, data } = useQuery(
    ['classifiertestdata', { classifier: classifier }],
    //@ts-ignore
    fetchClassifierData,
    { enabled: !!classifier }
  );
  return isLoading ? (
    <h1>Loading...</h1>
  ) : isError ? (
    <h1>is Error...</h1>
  ) : (
    <div>
      <div className="p-24">
        <div className="border-t-2 rounded-xl border-blue-400">
          <table className="w-full text-center divide-y divide-gray-800 border-separate border-2 rounded-xl">
            <thead className="bg-gray-200 text-gray-900 font-light">
              <tr>
                {Object.keys(data?.data[0])
                  .filter((key: string) => {
                    return !hiddenFields.includes(key);
                  })
                  .map((key: string) => {
                    return (
                      <th className="px-6 py-2 text-lg font-semibold">{key}</th>
                    );
                  })}
                <th className="px-6 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-500 font-semibold divide-y">
              {data?.data.map((element: any) => {
                return (
                  <tr className="hover:bg-blue-50">
                    {Object.keys(element)
                      .filter((key: string) => {
                        return !hiddenFields.includes(key);
                      })
                      .map((key: string) => {
                        return <td className="px-12 py-2">{element[key]}</td>;
                      })}
                    <td>
                      <div className="flex justify-center">
                        <button className="px-4 rounded-xl m-4 bg-red-500 text-gray-200">
                          <div>D</div>
                        </button>
                        <button className="p-2 px-4 rounded-xl m-4 bg-gray-500 text-gray-200">
                          <div>E</div>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ClassifierTable;

const fetchClassifierData = async (params: Params) => {
  const [_, { classifier }] = params.queryKey;
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/Classifier?classifier=${classifier}`
  );
};

interface Params {
  queryKey: [string, { classifier: string }];
}
