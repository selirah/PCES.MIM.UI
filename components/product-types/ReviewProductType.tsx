import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import ProductTypeDetails from './ProductTypeDetails';
import { ENV } from '../../env';

interface Props {
  productTypeId: string | string[] | undefined;
}
const ReviewProductType: React.FC<Props> = ({ productTypeId }: Props) => {
  const query = useQuery(
    ['reviewproducttype', { productTypeId: productTypeId }],
    //@ts-ignore
    fetchProductTypesById,
    { enabled: productTypeId != undefined, refetchOnWindowFocus: false }
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
    <div className="">
      <div className=" ">
        <div className="mx-2">
          <ProductTypeDetails data={data} />
        </div>
      </div>
    </div>
  );
};
export default ReviewProductType;

const fetchProductTypesById = async (params: Params) => {
  const [_, { productTypeId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Product/productTypeById?productTypeId=${productTypeId}`
  );
  console.log(result);
  return result;
};

// const fetchProductTypes = async () => {
//   return await axios.get(
//     ENV.NEXT_PUBLIC_API_ENDPOINT +
//       `/Product/productTypesBySubcategoryId?subcategoryId=${4}`
//   );
// };

interface Params {
  queryKey: [string, { productTypeId: number }];
}
