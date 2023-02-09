import React, { useEffect, useState } from 'react';
import ProductTypeList from 'components/product-types/ProductTypeList';
import { useQuery } from 'react-query';
import axios from 'axios';
import { ENV } from '../../env';

const AllProductTypes: React.FC = () => {
  const query = useQuery('allproducttypes', fetchProductTypes);
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
        <ProductTypeList data={data} />
      )}
    </div>
  );
};

export default AllProductTypes;

const fetchProductTypes = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productTypes');
};
