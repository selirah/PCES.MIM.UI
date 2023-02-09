import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import DepositDetails from './DepositDetails';
import DepositSituation from './DepositSituation';
import { ENV } from '../../../env';

interface Props {
  depositId: string | string[] | undefined;
}

const DepositPreview: React.FC<Props> = ({ depositId }: Props) => {
  const query = useQuery(
    ['depositsituationsingle', { depositId: depositId }],
    //@ts-ignore
    fetchDepositSituationById,
    { enabled: depositId != undefined, refetchOnWindowFocus: false }
  );

  const [data, setData] = useState<any>({});

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
      <div className=" px-8 mt-4">
        <div className="h-1/3">
          <DepositDetails data={data} />
        </div>
      </div>
      <div className="mb-8 w-full p-8">
        <DepositSituation data={data.ProductTypes} depositId={depositId} />
      </div>
    </div>
  );
};

export default DepositPreview;

const fetchDepositSituationById = async (params: Params) => {
  const [, { depositId }] = params.queryKey;
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Deposit/depositsituationbyid?depositId=${depositId}`
  );
};

interface Params {
  queryKey: [string, { depositId: number }];
}
