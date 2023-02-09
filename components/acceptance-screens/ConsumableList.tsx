import BaseTable from 'components/general/BaseTable';
import React, { useMemo } from 'react';

interface ProdTypes {
  products?: any[];
  setProducts: any;
}

const ProductList: React.FC<ProdTypes> = (props) => {
  const { products, setProducts } = props;
  // const data = useMemo(() => [
  //   {
  //     col1: '0160012064',
  //     col2: 'Nesto',
  //     col3: 'wwewevsdvs refaewf f',
  //     col4: 1,
  //     col5: 'Auto',
  //   },
  //   {
  //     col1: '0160012064',
  //     col2: '15-963-01-01',
  //     col3: 'SPATOLA ADDOMINALE MALLEABILE 330X30 MM',
  //     col4: 2,
  //     col5: 'Manual'
  //   },
  //   {
  //     col1: '0160012064',
  //     col2: '15-963-01-01',
  //     col3: 'SPATOLA ADDOMINALE MALLEABILE 330X30 MM',
  //     col4: 1,
  //     col5: 'Manual'
  //   }
  // ], [])

  const data = useMemo(() => products, [products]);
  const columns = useMemo(
    () => [
      {
        Header: 'Product Code',
        accessor: 'ProductCode',
      },
      {
        Header: 'Name',
        accessor: 'Name',
      },
      {
        Header: 'Description',
        accessor: 'Description',
      },
      {
        accessor: 'ProductId',
        Cell: ({ cell }) => <button className="bg-red-500 rounded-md text-white font-play font-semibold p-2 px-4 m-1" onClick={() => removeProduct(cell.value)}>x</button>
      }
    ],
    [products]
  );

  const removeProduct = (productId: number) => {
    setProducts(products.filter((product) => product.ProductId != productId))
  }

  return (
    <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-t-2 m-2 mt-4">
      <div className="flex flex-col text-base font-bold pt-4 px-4 ">
        Consumable List
      </div>
      <BaseTable columns={columns} data={data} />
    </div>
  );
};

export default ProductList;
