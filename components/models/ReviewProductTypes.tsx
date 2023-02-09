import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  currentData: any;
  setData: any;
}

const ModelProductTypes = (props: Props) => {
  const { setData, currentData } = props;
  const { data, refetch } = useQuery('producttypes', fetchProductTypes, {
    refetchOnWindowFocus: false,
  });
  const [allProductTypes, setAllProductTypes] = useState<any[]>([]);
  const [containers, setContainers] = useState<any>([]);

  useEffect(() => {
    let copyContainers = []
    currentData.forEach((productType) => {
      if (productType.Container === 0 || productType.Container === NaN) return
      let containerIndex = copyContainers.findIndex((container) => container.number === productType.Container)
      if (containerIndex != -1) {
        copyContainers[containerIndex].weight += productType.Weight * productType.Quantity
      } else {
        copyContainers.push({ number: productType.Container, weight: productType.Weight * productType.Quantity })
      }
    })
    setContainers(copyContainers)
  }, [currentData]);

  useEffect(() => {
    if (data != undefined) {
      setAllProductTypes(
        data.data.map((element: any) => {
          return {
            Barcode: element.barcode,
            CreationDate: element.creationDate,
            Deposit: element.deposit,
            DepositId: element.depositId,
            DescriptionEng: element.descriptionEng,
            DescriptionLocal: element.descriptionLocal,
            Image: element.image,
            LocationDeposit: element.locationDeposit,
            LocationDepositId: element.locationDepositId,
            ModificationDate: element.modificationDate,
            NameEng: element.nameEng,
            NameLocal: element.NameLocal,
            ProductCode: element.productCode,
            ProductId: element.productId,
            ProductStatus: element.productStatus,
            ProductStatusId: element.productStatusId,
            ProductType: element.productType,
            ProductTypeId: element.productTypeId,
            Weight: element.weight,
            Quantity: element.quantity
          };
        })
      );
    }
  }, [data, refetch]);

  const handleChangeQuantity = (e: any, index: number) => {
    if (e.target.value < 1) return;
    var productTypes2 = [...currentData];
    productTypes2[index].Quantity = e.target.value;
    setData(productTypes2);
  };

  const handleChangeTray = (e: any, index: number) => {
    if (e.target.value < 1) return;
    var productTypes2 = [...currentData];
    productTypes2[index].Tray = e.target.value;
    setData(productTypes2);
  };

  // const handleAdd = (index: number) => {
  //   let product = allProductTypes[index];

  //   let foundIndex = currentData.findIndex((element: any) => {
  //     return element.ProductTypeId == product.ProductTypeId;
  //   });
  //   if (foundIndex == -1) {
  //     product['Quantity'] = 1;
  //     setData([...currentData, product]);
  //   } else {
  //     let productTypes2 = [...currentData];
  //     productTypes2[foundIndex].Quantity =
  //       Number(productTypes2[foundIndex].Quantity) + 1;
  //     setData(productTypes2);
  //   }
  // };

  // const handleRemove = (index: number) => {
  //   setData(
  //     currentData.filter((element: any, i: number) => {
  //       return i != index;
  //     })
  //   );
  // };
  const handleAdd = (index: number) => {
    const product = allProductTypes[index];
    const existingIndex = currentData.findIndex((p) => p.ProductTypeId === product.ProductTypeId)
    if (existingIndex != -1) {
      let copy = [...currentData]
      copy[existingIndex].Quantity += 1
      setData(copy)
    } else {
      console.log(product)
      setData([...currentData, { ProductTypeId: product.ProductTypeId, ProductCode: product.ProductCode, NameEng: product.NameEng, DescriptionEng: product.DescriptionEng, Tray: 0, Container: 0, Quantity: 1, Weight: product.Weight }])
    }
  }


  const handleChangeContainer = (value: number, productTypeId: number) => {
    //if the number of containers is less than 1 or if it's larger by 2 steps (last container number is 2 and the user is trying to add a 4th or 5th) return without doing anything

    if (value < 1) return
    if (containers.length !== 0) {
      const numbers = containers.map((c) => c.number)
      if (Math.max(...numbers) + 1 < value) return
    }
    console.log(productTypeId)
    const existingIndex = currentData.findIndex((p) => p.ProductTypeId === productTypeId)
    let copy = [...currentData]
    copy[existingIndex].Container = value
    setData(copy)
  }


  const handleRemove = (productTypeId: number) => {
    setData(currentData.filter((productType) => productType.productTypeId != productTypeId))
  };

  const notSelectedProductsColumns = [
    {
      Header: 'Product Code',
      accessor: (product) => product.ProductCode,
    },
    {
      Header: 'Product',
      accessor: (product) => product.NameEng || product.nameEng,
    },
    {
      Header: 'Description',
      accessor: (product) => product.DescriptionEng || product.descriptionEng,
    },
    {
      Header: 'Weight',
      accessor: (product) => product.Weight || product.weight,
    },
    {
      Header: 'Add Product',
      Cell: ({ cell }: any) => {
        return (
          <button
            onClick={(event: any) => {
              handleAdd(cell.row.index);
            }}
            className="text-lg bg-blue-500 w-1/6 font-semibold text-white p-2 rounded-md hover:bg-blue-600"
          >
            +
          </button>
        );
      },
    },
  ];

  const selectedProductsColumns = [
    {
      Header: 'Product Code',
      accessor: (product) => product.ProductCode || product.productCode,
    },
    {
      Header: 'Product',
      accessor: (product) => product.NameEng || product.nameEng,
    },
    {
      Header: 'Description',
      accessor: (product) => product.DescriptionEng || product.descriptionEng,
    },
    {
      Header: 'Quantity',
      accessor: (product) => product.Quantity || product.quantity,
      Cell: ({ cell }: any) => {
        return (
          <input
            defaultValue={cell.value}
            type="number"
            className="rounded-md w-50"
            onBlur={(event) => {
              handleChangeQuantity(event, cell.row.index);
            }}
          />
        );
      },
    },
    {
      Header: 'Container',
      accessor: (product) => product.Container,
      Cell: ({ cell }: any) => {
        return <input
          defaultValue={cell.value}
          type="number"
          min="1"
          className="rounded-md w-50 "
          onBlur={(event) => {
            if (event.target.value === '') return
            handleChangeContainer(parseInt(event.target.value), cell.row.original.ProductTypeId);
          }}
        />
      }
    },
    {
      Header: 'Tray',
      accessor: (product) => product.Tray || product.tray,
      Cell: ({ cell }: any) => {
        return (
          <input
            defaultValue={cell.value}
            type="number"
            className="rounded-md w-50"
            onBlur={(event) => {
              handleChangeTray(event, cell.row.index);
            }}
          />
        );
      },
    },
    {
      Header: 'Remove',
      Cell: ({ cell }: any) => {
        return (
          <>
            <button
              onClick={() => {
                handleRemove(cell.row.original.ProductTypeId);
              }}
              className="text-gray-50 text-xl bg-red-500 rounded-md w-full p-2 hover:text-white hover:bg-red-600 "
            >
              x
            </button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="row-span-2 mt-4">
        {/* <div className="flex flex-col text-xl font-bold pt-4 px-4">
          Selected
        </div> */}
        <div className="w-full mt-4 mb-4 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <div className="flex flex-col text-base font-bold pt-4 px-4">
            <div> Selected Products</div>
            <div className="flex">
              {containers.sort((container1, container2) => container1.number - container2.number).map((container) => {
                return <span className={`font-play p-2 ${container.weight > 12000 ? 'text-red-500' : ''}`}>Container {container.number} - Weight: {container.weight} {container.weight > 12000 ? '(Overweight)' : ''}</span>
              })}
            </div>
          </div>
          <BaseTable data={currentData} columns={selectedProductsColumns} />
        </div>
        <div className="flex flex-col text-xl font-bold pt-4 px-4 mb-2">
          Products
        </div>
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <BaseTable
            data={allProductTypes}
            columns={notSelectedProductsColumns}
          />
        </div>
      </div>
    </>
  );
};

export default ModelProductTypes;

const fetchProductTypes = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/Product/productTypesBySubcategoryId?subcategoryId=${1}`
  );
};
