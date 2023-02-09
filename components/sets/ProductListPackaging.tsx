import BaseTable from 'components/general/BaseTable';

import React, { useMemo } from 'react';
import { ClipLoader } from 'react-spinners';

interface ProdTypes {
  checkedProducts: number[]
  setCheckedProducts: any
  products: any[];
  setShowPopup: any
  setSelectedInstrument: any
  loadingInstrumentId: number
}

const ProductListPackaging: React.FC<ProdTypes> = (props) => {
  const { products, checkedProducts, setCheckedProducts, setShowPopup, setSelectedInstrument, loadingInstrumentId } = props;


  const handleClick = (instrumentId: number) => {
    if (checkedProducts.includes(instrumentId)) {
      setCheckedProducts(checkedProducts.filter((instrument) => instrument !== instrumentId))
    } else {
      setCheckedProducts([...checkedProducts, instrumentId])
    }
  }


  const columns = useMemo(
    () => [
      {
        Header: 'Product Code',
        accessor: 'productCode',
      },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Actions',
        accessor: 'instrumentId',
        Cell: ({ cell }: any) => {
          return (
            <div className="w-full">
              {!checkedProducts.includes(cell.value) ? <button className="font-play text-white bg-green-600 py-2 w-20 rounded-md my-2 hover:bg-red-500 hover:opacity-80" onClick={() => handleClick(cell.value)}>✓</button>
                :
                <div className="flex">
                  <div className="w-1/2">
                    <button
                      className="font-play text-white bg-red-600 py-1 rounded-md my-2 w-20 text-lg hover:bg-green-500 hover:opacity-80 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:bg-red-600"
                      onClick={() => handleClick(cell.value)}
                      disabled={loadingInstrumentId === cell.value}>
                      x
                    </button>
                  </div>
                  <div className="w-1/2">
                    {loadingInstrumentId !== cell.value ? <button className="bg-gradient-left-right disabled:opacity-90 disabled:cursor-not-allowed rounded-md text-white font-play py-2 font-semibold my-2 w-20"
                      onClick={() => { setSelectedInstrument(cell.value); setShowPopup(true) }}
                      disabled={loadingInstrumentId != 0}
                    >
                      Replace
                    </button> : <div className="mt-2"> <ClipLoader color='#003E78' /></div>}
                  </div>
                </div>}
            </div>
          )
        }
      }
    ],
    [products, checkedProducts, loadingInstrumentId],
  );
  return (
    <div className="w-full flex flex-col  shadow-md rounded-md border-blue-navy border-t-4 overflow-auto">
      <div className="flex flex-col text-base font-bold pt-4 px-4">
        Products
      </div>
      <BaseTable columns={columns} data={products} />
    </div>
  );
};

export default ProductListPackaging;
