import axios from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect, useMemo, useState } from 'react';
import BaseTable from 'components/general/BaseTable';
import ClassifierPopup, { PopupType } from './ClassifierPopup';
import { ENV } from '../../env';

interface Props {
  hiddenTableFields: string;
  classifier: string;
}

const PricingTable: React.FC<Props> = ({
  hiddenTableFields,
  classifier,
}: Props) => {
  const dataQuery = useQuery(['depositsituation', { classifier }], fetchData);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [classifierObject, setClassifierObject] = useState<any>({});

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (dataQuery.data != undefined) {
      setData(dataQuery.data.data);
    }
  }, [dataQuery.data]);

  const columns = useMemo(() => {
    if (data.length != 0) {
      let column = Object.keys(data[0])
        .filter((key: string) => {
          return !hiddenTableFields.includes(key);
        })
        .map((element: any) => {
          return { Header: element, accessor: element };
        });
      column.push({
        Header: 'Actions',
        accessor: '',
        //@ts-ignore
        Cell: ({ cell }) => {
          return (
            <div className="grid justify-center grid-cols-1 gap-1">
              <button
                onClick={() => {
                  setClassifierObject(cell.row.original);
                  setOpenEdit(true);
                }}
                className="text-white bg-gray-500  rounded-md font-semibold"
              >
                Edit
              </button>
            </div>
          );
        },
      });
      return column;
    } else return [];
  }, [data]);

  return dataQuery.isLoading ? (
    <h1>Loading...</h1>
  ) : dataQuery.isError ? (
    <h1>Error</h1>
  ) : (
    <div className="p-8">
      <div className="flex flex-col  font-bold text-xl pt-4 px-4">
        {classifier[0].toUpperCase() + classifier.slice(1, classifier.length)}
      </div>
      <div className="row-span-2 mt-4 mb-8">
        <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
          <div className="w-fit overflow-x-scroll">
            <BaseTable data={data} columns={columns} />
          </div>
        </div>
      </div>

      <ClassifierPopup
        classifier={classifier}
        type={PopupType.ADD}
        setShow={setOpenAdd}
        show={openAdd}
      />
      <ClassifierPopup
        classifier={classifier}
        type={PopupType.DELETE}
        setShow={setOpenDelete}
        classifierObject={classifierObject}
        show={openDelete}
      />
      <ClassifierPopup
        classifier={classifier}
        classifierObject={classifierObject}
        type={PopupType.EDIT}
        setShow={setOpenEdit}
        show={openEdit}
      />
    </div>
  );
};

const fetchData = async (params: Params) => {
  const [_, { classifier }] = params.queryKey;
  const result = await axios.get(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/Classifier?classifier=${classifier}`
  );
  return result;
};

interface Params {
  queryKey: any;
}

export default PricingTable;
