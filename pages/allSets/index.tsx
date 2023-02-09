import React, { useEffect, useState } from 'react';
import SetList from 'components/sets/SetList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from '../../env';

const AllSets: React.FC = () => {
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
        <SetList data={data} />
      )}
    </div>
  );
};

export default AllSets;

const fetchSets = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Set/allSetsWithModelName');
};
