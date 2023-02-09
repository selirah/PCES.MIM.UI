import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import SituationTable from './SituationTable';
import { ENV } from '../../env';

const DepositSituation: React.FC = () => {
  const query = useQuery('depositsituation', fetchDepositSituation);
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);
  return (
    <div className="text-center">
      {query.isLoading ? (
        <h1>Loading...</h1>
      ) : query.isError ? (
        <h1>Error</h1>
      ) : (
        <SituationTable data={data} />
      )}
    </div>
  );
};

export default DepositSituation;

const fetchDepositSituation = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/depositsituation');
};
