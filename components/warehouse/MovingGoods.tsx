import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

const MovingGoods: React.FC = () => {
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const depositsFromQuery = useQuery('depositsFrom', fetchDeposits);
  const [depositsFrom, setDepositsFrom] = useState<any[]>([]);
  const depositsToQuery = useQuery('depositsTo', fetchDeposits);
  const [depositsTo, setDepositsTo] = useState<any[]>([]);
  const [selectedFromValue, setSelectedFromValue] = useState(0);
  const [selectedToValue, setSelectedToValue] = useState(0);
  const [Show, setShow] = useState<any>(false);

  const productsToMoveQuery = useQuery(
    [
      'products',
      { depositFromId: selectedFromValue, depositToId: selectedToValue },
    ],
    fetchProductsToMove,{
      refetchOnWindowFocus:false,enabled:(selectedFromValue!=0 && selectedToValue!=0)
    }
  );

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    if (depositsFromQuery.data != undefined) {
      setDepositsFrom(depositsFromQuery.data.data);
    }
  }, [depositsFromQuery.data]);

  useEffect(() => {
    if (depositsToQuery.data != undefined) {
      setDepositsTo(depositsToQuery.data.data);
    }
  }, [depositsToQuery.data]);

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productsToMoveQuery.data != undefined) {
      setProducts(productsToMoveQuery.data.data);
    }
  }, [productsToMoveQuery.data]);

  const handleFromChange = (event: any) => {
    setSelectedFromValue(parseInt(event.target.value));
    if (parseInt(event.target.value) === selectedToValue) {
      setSelectedToValue(0)
      setDepositsTo(depositsFrom.filter((deposit) => deposit.DepositId !== parseInt(event.target.value)))
    }
  };
  const handleToChange = (event: any) => {
    setSelectedToValue(parseInt(event.target.value));
  };

  const handleCheck = (event: any, index: number) => {
    var products2 = products?.map((element: any) => {
      return element;
    });
    products2[index].Checked = !products2[index].Checked;
    setProducts(products2);
  };

  const checkAll = () => {
    var products2 = products?.map((element: any) => {
      return element;
    });
    products2.forEach((element: any) => {
      element.Checked = !element.Checked;
    });
    setProducts(products2);
  };

  useEffect(() => {
    productsToMoveQuery.refetch();
  }, [selectedFromValue, selectedToValue]);

  const handleSubmit = async () => {
    const productsToMove = products
      .filter((element: any) => {
        return element.Checked == true;
      })
      .map((element: any) => {
        return element.ProductId;
      });
    if (productsToMove.length == 0) {
      setShowError(true);
      return;
    }
    const toSubmit = {
      Products: productsToMove,
      DepositId: selectedToValue,
    };
    await axios.post(`${ENV.NEXT_PUBLIC_API_ENDPOINT}/Process/transfer`, toSubmit);
    setShowSuccess(true);
  };

  const columns = [
    {
      Header:'Product Code',
      accessor:'ProductCode'
    },
    {
      Header: 'Product Name',
      accessor: 'ProductTypeName',
    },
    {
      Header:'Description',
      accessor:'ProductTypeDescription'
    },
    {
      Header: 'Approve',
      Cell: ({ cell }: any) => {
        return (
          <input
            type="checkbox"
            className="border-blue-600 border-2"
            checked={cell.row.original.Checked}
            onChange={(event) => {
              handleCheck(event, cell.row.id);
            }}
          />
        );
      },
    },
  ];

  return depositsFromQuery.isLoading ? (
    <h1>Loading...</h1>
  ) : depositsFromQuery.isError ? (
    <h1>Error</h1>
  ) : (
    <>
      {' '}
      <div className="p-8">
        <div className="flex justified-between">
          <div className="w-full flex flex-col mt-2 mr-8 border-2 rounded-md shadow-md">
            <div className="font-semibold font-play text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
              Deposit From
            </div>
            <div className="p-4">
              <select
                value={selectedFromValue}
                className="w-full rounded-md"
                onChange={handleFromChange}
              >
                <option value={0}>Select deposit from...</option>
                {depositsFrom.map((element: any, index: number) => {
                  return (
                    <option value={element.DepositId}>{element.DepositCode}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col mt-2 border-2 rounded-md shadow-md">
            <div className="font-semibold font-play text-lg border-b-2 p-2 bg-gradient-left-right text-white rounded-t-md">
              Deposit To
            </div>
            <div className="p-4">
              <select
                value={selectedToValue}
                className="w-full rounded-md"
                onChange={handleToChange}
              >
                <option value={0}>Select deposit to...</option>
                {depositsTo.map((element: any, index: number) => {
                  return (
                    <option value={element.DepositId}>{element.DepositCode}</option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div>
          <button
            className="bg-gradient-top-bottom font-play mt-8 mb-2 text-white font-semibold p-2 rounded-md"
            onClick={checkAll}
          >
            Check All
          </button>
          <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
            Products To Move
          </div>
          <BaseTable data={products} columns={columns} />
        </div>
        <div>
          <button
            className="bg-gradient-top-bottom font-play p-4 w-full font-semibold text-white rounded-md "
            onClick={handleSubmit}
          >
            Move Items
          </button>
        </div>
      </div>
      {showError ? (
        <GeneralFailPopup
          errorMessage="Nothing to move"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/'}
          buttonMessage={'Ok'}
          successMessage={'Successfully moved items'}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default MovingGoods;

const fetchDeposits = async () => {
  return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/Deposit/depositsDropDown');
};

const fetchProductsToMove = async (params: Params) => {
  const [_, { depositFromId, depositToId }] = params.queryKey;
  return await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
    `/Product/productsfortransfer?depositFromId=${depositFromId}&depositToId=${depositToId}`
  );
};

interface Params {
  queryKey: any;
}
