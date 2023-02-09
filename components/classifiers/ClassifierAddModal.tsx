import axios from 'axios';
import FormIOExample from 'components/formio-example';
import React from 'react';
import { ENV } from '../../env';

interface Props {
  classifier: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const path = '?path=depositType&replaceApiUrl=true';

const ClassifierAddModal: React.FC<Props> = ({
  classifier,
  visible,
  setVisible,
}: Props) => {
  console.log(ENV.NEXT_PUBLIC_FORMIO_ORIGIN);
  return <div>{<FormIOExample path={path} onSubmit={handleSubmit} />}</div>;
};

export default ClassifierAddModal;

const handleSubmit = async (data: any) => {
  const res = await axios.post(
    ENV.NEXT_PUBLIC_API_ENDPOINT + `/WF/start/process/CreateDepositTypeId`,
    { data: data }
  );
  return res;
};
