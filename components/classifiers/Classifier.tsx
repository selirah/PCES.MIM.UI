import React, { useState } from 'react';
import ClassifierTable from './ClassifierTable';
import ClassifierAddModal from './ClassifierAddModal';
interface Props {
  classifier: string;
  hiddenFields: string;
}

const Classifier: React.FC<Props> = ({ classifier, hiddenFields }: Props) => {
  const [viewModal, setViewModal] = useState(false);

  return (
    <div>
      <div>
        <div className="mr-auto ml-auto w-full">
          <ClassifierTable
            hiddenFields={hiddenFields}
            classifier={classifier}
          />
        </div>
        <div className="w-full flex">
          <button
            className="mb-8 m-auto py-6 px-16 border-blue-900 bg-blue-900 hover:bg-blue-700 rounded-3xl text-blue-100 hover:text-white hover:scale-105 "
            onClick={() => {
              setViewModal(true);
            }}
          >
            <div className="  text-xl font-semibold">Modal</div>
          </button>
        </div>

        <ClassifierAddModal
          classifier={classifier}
          visible={viewModal}
          setVisible={setViewModal}
        />
      </div>
    </div>
  );
};

export default Classifier;
