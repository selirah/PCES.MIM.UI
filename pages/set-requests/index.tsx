import React, { useEffect, useState } from 'react';
import SetList from 'components/sets/SetList';
import { useQuery } from 'react-query';
import axios from 'axios';
import SetRequestsList from 'components/sets/SetRequestsList';
import { ENV } from 'env';

const SetRequests: React.FC = () => {
  const query = useQuery('allsets', fetchSets);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  return (
    <div className="text-center screen-background h-full">
      {query.isLoading ? (
        <h1>Loading...</h1>
      ) : query.isError ? (
        <h1>Error</h1>
      ) : (
        <SetRequestsList data={data} redirectPath="set-requests"/>
      )}
    </div>
  );
};

export default SetRequests;

const fetchSets = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/allSetsWithModelName?statusId=6');
};
