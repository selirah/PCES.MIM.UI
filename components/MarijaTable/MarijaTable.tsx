import axios from 'axios';
import { useQuery } from 'react-query';
import React, { useEffect, useMemo, useState } from 'react';
import BaseTable from 'components/general/BaseTable';
import ClassifierPopup, { PopupType } from './ClassifierPopup';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import { OpenValidate } from 'types/user-managemnt';
import { ENV } from '../../env';

interface Props {
  hiddenTableFields: string;
  classifier: string;
}

const MarijaTable: React.FC<Props> = ({
  hiddenTableFields,
  classifier,
}: Props) => {
  const dataQuery = useQuery(['depositsituation', { classifier }], fetchData);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [classifierObject, setClassifierObject] = useState<any>({});
  const [openValidate, setOpenValidate] = useState<OpenValidate>({
    open: false,
    action: '',
  });
 

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (dataQuery.data != undefined) {
      setData(dataQuery.data.data);
    }
  }, [dataQuery.data]);
  
  const handleOnClose = () => {
    setOpenValidate({ open: false, action: '' });
  }

  const validatePasswordResult = (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      switch (openValidate?.action) {
        case 'delete':
          setOpenDelete(true);
          break;
        case 'edit':
          setOpenEdit(true);
          break;
        case 'add':
          setOpenAdd(true);
          break;
        default: {
        }
      }
    }
  };

  const columns = useMemo(() => {
    if (data.length != 0) {
      let column = Object.keys(data[0])
        .filter((key: string) => {
          return !hiddenTableFields.split(',').includes(key);
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
            <div className="grid justify-center grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setClassifierObject(cell.row.original);
                  setOpenValidate({ open: true, action: 'edit' });
                }}
                className="text-white bg-gray-500  rounded-md font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setClassifierObject(cell.row.original);
                  setOpenValidate({ open: true, action: 'delete' });
                }}
                className=" bg-red-600 text-white text-lg  rounded-md font-semibold"
              >
                x
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

      <button
        onClick={() => {
          setOpenValidate({ open: true, action: 'add' });
          setClassifierObject({});
        }}
        className={
          'w-full bg-blue-900 rounded-md hover:bg-blue-700 font-semibold text-white text-lg p-2 mx-auto'
        }
      >
        Add New{' '}
        {classifier[0].toUpperCase() + classifier.slice(1, classifier.length)}
      </button>
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
      <ValidatePasswordPopup
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
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

export default MarijaTable;
