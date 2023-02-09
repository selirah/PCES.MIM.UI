import { triggerAsyncId } from 'async_hooks';
import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import LessFlashyBaseTable from 'components/general/LessFlashyBaseTable';
import { getBase64Tray } from 'interfaces/Functions';
import React, { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  dataProducts: any;
  setData: any;
}

const DuplicateAndRevisionModelProductTypes = (props: Props) => {
  const { setData, dataProducts } = props;
  const { data, refetch } = useQuery('producttypes', fetchProductTypes, {
    refetchOnWindowFocus: false,
  });
  const [allProductTypes, setAllProductTypes] = useState<any[]>([]);
  const [containers, setContainers] = useState<
    {
      number: number;
      weight: number;
      trays: { number: number; imageBase64: string; products: any[] }[];
    }[]
  >(undefined);

  const [selectedTray, setSelectedTray] =
    useState<{ containerNumber: number; trayNumber: number }>(null);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    if (data != undefined) {
      setAllProductTypes(data.data);
    }
  }, [data, refetch]);

  useEffect(() => {
    setData(containers);
  }, [containers]);

  useEffect(() => {
    if (containers === undefined) {
      setContainers(dataProducts);
    }
  }, [dataProducts]);

  const notSelectedProductsColumns = [
    {
      Header: 'Add Product',
      Cell: ({ cell }: any) => {
        return (
          <button
            onClick={(event: any) => {
              handleAddProduct(cell.row.original.productTypeId);
            }}
            className="ml-4 text-3xl text-gradient w-1/6 font-bold p-2 rounded-md"
          >
            +
          </button>
        );
      },
    },
    {
      Header: 'Product Code',
      accessor: 'productCode',
    },
    {
      Header: 'Name',
      accessor: 'nameEng',
    },
    {
      Header: 'Description',
      accessor: 'descriptionEng',
    },
    {
      Header: 'Weight',
      accessor: 'weight',
    },
  ];
  const addedProducts = [
    {
      Header: 'Product Code',
      accessor: 'productCode',
    },
    {
      Header: 'Name',
      accessor: 'nameEng',
    },
    {
      Header: 'Description',
      accessor: 'descriptionEng',
    },
    {
      Header: 'Weight',
      accessor: 'weight',
    },
    {
      Header: 'Quantity',
      accessor: 'quantity',
    },
    {
      Header: 'Remove',
      Cell: (cell) => {
        return (
          <button
            className="rounded-xl bg-red-500 font-semibold font-play text-center text-2xl text-white px-4"
            onClick={() => {
              reduceQuantity(cell.row.original.productTypeId);
            }}
          >
            -
          </button>
        );
      },
    },
  ];

  const reduceQuantity = (productTypeId: number) => {
    if (selectedTray) {
      var containersCopy = [...containers];
      var container = containersCopy[selectedTray.containerNumber - 1];
      var tray = container.trays[selectedTray.trayNumber - 1];
      var productIndex = tray.products.findIndex(
        (product) => product.productTypeId === productTypeId
      );
      if (productIndex === -1) return;
      container.weight -= tray.products[productIndex].weight;

      if (tray.products[productIndex].quantity - 1 <= 0) {
        tray.products = tray.products.filter(
          (product) => product.productTypeId !== productTypeId
        );
      } else {
        tray.products[productIndex].quantity =
          tray.products[productIndex].quantity - 1;
      }
      container.trays[selectedTray.trayNumber - 1] = tray;
      containersCopy[selectedTray.containerNumber - 1] = container;
      setContainers(containersCopy);
    }
  };

  const addContainer = () => {
    setError('');
    setContainers([
      ...containers,
      { trays: [], number: containers.length + 1, weight: 0 },
    ]);
  };

  const handleAddProduct = (productTypeId: number) => {
    if (!containers.length) {
      setError('Please add a container');
      return;
    }
    if (!selectedTray) {
      setError(
        "Please select a tray. If you haven't added any, click on 'Add Tray'"
      );
      return;
    }
    var containersCopy = [...containers];
    var container = containersCopy[selectedTray.containerNumber - 1];
    var tray = container.trays[selectedTray.trayNumber - 1];
    var productIndex = tray.products.findIndex(
      (product) => parseInt(product.productTypeId) === productTypeId
    );
    if (productIndex != -1) {
      tray.products[productIndex].quantity += 1;
      container.weight += tray.products[productIndex].weight;
    } else {
      const product = {
        ...allProductTypes.find(
          (product) => product.productTypeId === productTypeId
        ),
        quantity: 1,
      };
      tray.products = [...tray.products, product];
      container.weight += product.weight;
    }
    container.trays[selectedTray.trayNumber - 1] = tray;
    containersCopy[selectedTray.containerNumber - 1] = container;
    setContainers(containersCopy);
  };

  const addTray = (containerNumber: number) => {
    setError('');
    var containersCopy = [...containers];
    var container = containersCopy[containerNumber - 1];
    container.trays = [
      ...container.trays,
      {
        number: container.trays.length + 1,
        imageBase64: undefined,
        products: [],
      },
    ];
    containersCopy[containerNumber - 1] = container;
    setContainers(containersCopy);
  };

  const handleFileUpload = (
    containerNumber: number,
    trayNumber: number,
    file
  ) => {
    getBase64Tray(file, setContainers, containers, containerNumber, trayNumber);
  };

  const handleRemoveImage = (containerNumber: number, trayNumber: number) => {
    var containersCopy = [...containers];
    var container = containersCopy[containerNumber - 1];
    var tray = container.trays[trayNumber - 1];
    tray.imageBase64 = undefined;
    container.trays[trayNumber - 1] = tray;
    containersCopy[containerNumber - 1] = container;
    setContainers(containersCopy);
  };

  const handleRemoveTray = (containerNumber: number, trayNumber: number) => {
    var containersCopy = [...containers];
    var container = containersCopy[containerNumber - 1];
    container.trays[trayNumber - 1].products.forEach((product) => {
      container.weight -= product.weight * product.quantity;
    });
    container.trays = container.trays.filter(
      (tray) => tray.number != trayNumber
    );
    container.trays.forEach((tray) => {
      if (tray.number > trayNumber) {
        tray.number -= 1;
      }
    });
    containersCopy[containerNumber - 1] = container;
    setContainers(containersCopy);
  };

  return (
    <>
      {error ? (
        <div className="text-md font-play font-semibold text-red-700">
          {' '}
          {error}{' '}
        </div>
      ) : null}
      <div className="flex justify-between">
        <div className="w-1/2">
          {containers?.map((container) => {
            return (
              <div className="border-blue-navy rounded-md p-4 border-2 mb-4">
                <div className={`font-semibold text-gradient`}>
                  Weight: {container.weight}{' '}
                  {container.weight > 1200 ? (
                    <span className="text-red-500">( Overweight )</span>
                  ) : null}
                </div>
                {container.trays && container.trays.length
                  ? container.trays.map((tray) => {
                      return (
                        <div
                          className={`${
                            selectedTray &&
                            selectedTray.containerNumber === container.number &&
                            selectedTray.trayNumber === tray.number
                              ? 'border-blue-ocean border-4'
                              : 'border-blue-navy border-2'
                          } rounded-md p-4 mb-4`}
                          onClick={() => {
                            if (
                              selectedTray &&
                              tray.number != selectedTray.trayNumber &&
                              container.number != selectedTray.containerNumber
                            ) {
                              setSelectedTray({
                                containerNumber: container.number,
                                trayNumber: tray.number,
                              });
                            } else {
                              setSelectedTray({
                                containerNumber: container.number,
                                trayNumber: tray.number,
                              });
                            }
                          }}
                        >
                          <>
                            <div
                              className="px-2 py-1 font-semibold font-play text-white bg-red-500 rounded-md text-center mb-2 -ml-4 -mt-4 hover:cursor-pointer"
                              onClick={() =>
                                handleRemoveTray(container.number, tray.number)
                              }
                            >
                              Remove Tray
                            </div>
                            <div className="flex justify-between">
                              <label className="cursor-pointer border-2 bg-blue-even-lighter h-1/3 text-gradient border-blue-ocean  font-play font-semibold text-xl p-2 rounded-md w-1/3">
                                Browse
                                <input
                                  className="hidden"
                                  onChange={(event: any) => {
                                    handleFileUpload(
                                      container.number,
                                      tray.number,
                                      event.target.files[0]
                                    );
                                  }}
                                  type="file"
                                  accept="image/*"
                                />
                              </label>
                              {tray.imageBase64 ? (
                                <img
                                  src={tray.imageBase64}
                                  alt="Tray Image"
                                  className="w-36 h-28 border-2 border-blue-dark-ocean rounded-md"
                                />
                              ) : null}
                              {tray.imageBase64 ? (
                                <div>
                                  <button
                                    className="bg-gradient-top-bottom text-white text-semibold text-center font-play  px-2 pb-1 rounded-md"
                                    onClick={() => {
                                      handleRemoveImage(
                                        container.number,
                                        tray.number
                                      );
                                    }}
                                  >
                                    Remove Image
                                  </button>
                                </div>
                              ) : null}
                            </div>
                            <div className="my-4">
                              <LessFlashyBaseTable
                                data={tray.products}
                                columns={addedProducts}
                              />
                            </div>
                          </>
                        </div>
                      );
                    })
                  : null}
                <button
                  className="text-gradient-dark font-play font-semibold border-2 border-blue-ocean rounded-md text-center py-2 w-full"
                  onClick={() => addTray(container.number)}
                >
                  + Add Tray
                </button>
              </div>
            );
          })}
          <button
            className="text-gradient-dark font-play font-semibold border-2 border-blue-ocean rounded-md text-center py-2 w-full"
            onClick={addContainer}
          >
            + Add Container
          </button>
        </div>
        <div className="w-1/2">
          <BaseTable
            data={allProductTypes}
            columns={notSelectedProductsColumns}
          />
        </div>
      </div>
    </>
  );
};

export default DuplicateAndRevisionModelProductTypes;

const fetchProductTypes = async () => {
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Product/productTypesBySubcategoryId?subcategoryId=${1}`
  );
};
