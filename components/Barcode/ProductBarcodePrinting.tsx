import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

const ProductBarcodePrinting = () => {
  const { isLoading, data, isError } = useQuery('fetchproducts', fetchProducts);

  const [products, setProducts] = useState<any[]>();

  useEffect(() => {
    setProducts(data?.data);
  }, [data]);

  useEffect(() => {
    setSelectedBarcode(products != undefined ? products[0].barcode : undefined);
  }, [products]);
  const [selectedBarcode, setSelectedBarcode] = useState<any>('');
  console.log(selectedBarcode);
  const generateBarcode = async () => {
    var result = await axios.post(
      ENV.NEXT_PUBLIC_API_ENDPOINT +
        `/Report/barcode?barcode=${selectedBarcode}`,
      {},
      { responseType: 'blob' }
    );
    let a = document.createElement('a');
    a.href = window.URL.createObjectURL(result.data);
    a.download = `${selectedBarcode}.pdf`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (isLoading) return <h1>Loading...</h1>;
  else if (isError) {
    return <h1>Error</h1>;
  } else {
    return (
      <div className="flex flex-col w-1/2 m-auto">
        <select
          className="m-2"
          value={selectedBarcode}
          onChange={(event: any) => {
            setSelectedBarcode(event.target.value);
          }}
        >
          {products?.map((element: any) => {
            return (
              <option value={element.productCode}>{element.nameEng}</option>
            );
          })}
        </select>
        <button
          onClick={generateBarcode}
          className="rounded-md bg-blue-500 m-2 text-white h-12"
        >
          Generate Product Barcode
        </button>
      </div>
    );
  }
};

const fetchProducts = async () => {
  return axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Product/productTypes');
};

export default ProductBarcodePrinting;
