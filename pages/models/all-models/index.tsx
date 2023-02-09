import AppLayout from 'components/AppLayout';
import React, { useEffect, useState } from 'react';
import ModelList from 'components/models/ModelList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from '../../../env';

const AllModels: React.FC = () => {
  const query = useQuery('allmodels', fetchModels);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  return (
    <div className="screen-background">
      {query.isLoading ? (
        <h1>Loading...</h1>
      ) : query.isError ? (
        <h1>Error</h1>
      ) : (
        <ModelList data={data} />
      )}
    </div>
  );
};

export default AllModels;

const fetchModels = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/SetModel');
};
