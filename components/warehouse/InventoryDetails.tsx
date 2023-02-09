import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import React, { useEffect, useState } from 'react';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  depositId: string | string[] | undefined;
}
const InventoryDetsils: React.FC<Props> = ({ depositId }: Props) => {
  const query = useQuery(
    ['editquantity', { depositId: depositId }],
    //@ts-ignore
    fetchCountedProductTypes,
    { enabled: depositId != undefined, refetchOnWindowFocus: false }
  );
  const [data, setData] = useState<any[]>([]);
  const [depositName, setDepositName] = useState<any>();

  useEffect(() => {
    if (query.data != undefined) {
      setData(query.data.data);
    }
  }, [query.data]);

  const columns = [
    {
      Header: 'Name',
      accessor: 'NameEng',
    },
    {
      Header: 'Description',
      accessor: 'DescriptionEng',
    },
    {
      Header: 'Quantity',
      accessor: 'Quantity',
    },
    {
      Header: 'Last Edited',
      accessor: 'LastEdited',
      Cell: ({ cell }) => {
        return cell.row.original.LastEdited
          ? cell.row.original.LastEdited
          : 'N/A';
      },
    },
    {
      Header: 'Edit Quantity',
      Cell: ({ cell }: any) => {
        const [newQuantity, setNewQuantity] = useState<any>();
        const [quantity, setQuantity] = useState<any>();
        const [depositId, setDepositId] = useState<any>();
        const [productTypeId, setProductTypeId] = useState<any>();
        const [showSuccess, setShowSuccess] = useState<boolean>(false);
        const [errorMessage, setErrorMessage] = useState<string>('');
        const [showError, setShowError] = useState<boolean>(false);
        useEffect(() => {
          setQuantity(cell.row.original.Quantity);
          setDepositId(cell.row.original.DepositId);
          setProductTypeId(cell.row.original.ProductTypeId);
        }, [cell.row.original.Quantity]);
        const handleSubmit = async () => {
          const toSubmit = {
            quantity,
            newQuantity,
            productTypeId,
            depositId,
          };
          try {
            await axios.put(
              ENV.NEXT_PUBLIC_API_ENDPOINT +
                '/Deposit/updateProductTypeQuantityByDepositId',
              toSubmit
            );
            setShowSuccess(true);
          } catch (error) {
            setErrorMessage('Something went wrong. Try again');
            setShowError(true);
          }
        };
        return (
          <div className="flex justify-center gap-3">
            <input
              type="number"
              className="rounded-md w-1/6"
              defaultValue={cell.row.original.Quantity}
              onBlur={(event) => setNewQuantity(event.target.value)}
            />
            <button
              className="hover:scale-110 bg-green-600 rounded-md text-white font-semibold p-3"
              onClick={handleSubmit}
            >
              Update Quantity
            </button>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    data.map((element: any) => {
      setDepositName(element.DepositName);
    });
  });

  return query.isLoading ? (
    <h1>Loading...</h1>
  ) : query.isError ? (
    <h1>Error</h1>
  ) : (
    <div className=" m-4 flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
      <div className="flex flex-col text-left text-lg font-bold pt-4 px-4">
        Deposit No. {depositId} - Inventory
      </div>
      <BaseTable data={data} columns={columns} />
    </div>
  );
};
export default InventoryDetsils;

const fetchCountedProductTypes = async (params: Params) => {
  const [_, { depositId }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT +
      `/Deposit/countedProductTypesByDepositId?depositId=${depositId}`
  );
  return result;
};

interface Params {
  queryKey: [string, { depositId: number }];
}
