import BaseTable from 'components/general/BaseTable';
import { Set } from 'interfaces/Sets';
import React, { useEffect, useMemo, useState } from 'react';

interface ProdTypes {
  setDetails?: Set;
  setReceivedInstruments?: any;
  productsListing?: any;
}

const ProductList: React.FC<ProdTypes> = (props) => {
  const { setDetails, setReceivedInstruments, productsListing } = props;
  const productList =
    setDetails && setDetails !== undefined ? setDetails.Products : [];

  const pr =
    productsListing && productsListing !== undefined ? productsListing : [];

  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    setProducts(
      productsListing && productsListing !== undefined
        ? productsListing.map((element: any) => {
          return {
            ...element,
            ultraSound: false,
            manualWash: false,
          };
        })
        : []
    );
  }, [productsListing]);


  const columns = useMemo(
    () => [
      {
        Header: 'Product Code',
        accessor: 'productCode',
      },
      {
        Header: 'Product Name',
        accessor: 'name',
      },
      {
        Header: 'Product Description',
        accessor: 'description'
      },
    ],
    [products]
  );
  return (
    <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-navy border-t-4 ">
      <div className="flex flex-col text-base font-bold pt-4 px-4">
        Product List
      </div>
      <BaseTable columns={columns} data={products} />
    </div>
  );
};

export default ProductList;
