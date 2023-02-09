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

const ComplexityTypeTable: React.FC<Props> = ({
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
      return column;
    } else return [];
  }, [data]);

  return dataQuery.isLoading ? (
    <h1>Loading...</h1>
  ) : dataQuery.isError ? (
    <h1>Error</h1>
  ) : (
    <>
      <div className="screen-background h-full">
        <div className="p-8">
          <div className="flex flex-col  font-bold text-xl pt-4 px-4 font-play text-gradient">
            Complexity Type
          </div>
          <div className="row-span-2 mt-4 mb-8">
            <div className="w-fit overflow-x-auto">
              <BaseTable data={data} columns={columns} />
            </div>
          </div>

          {/* <button
        onClick={() => {
          setOpenAdd(true);
          setClassifierObject({});
        }}
        className={
          'w-full bg-blue-900 rounded-md hover:bg-blue-700 font-semibold text-white text-lg p-2 mx-auto'
        }
      >
        Add New{' '}
        {classifier[0].toUpperCase() + classifier.slice(1, classifier.length)}
      </button> */}
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
      </div>
    </>
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

export default ComplexityTypeTable;
