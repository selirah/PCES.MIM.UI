import { useFormFetch } from 'middleware/formio';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import styles from "./index.module.css"

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('@formio/react').then((mod) => mod.Form), {
  ssr: false,
});

type FormProps = {
  path: string;
  onSubmit: (data: any) => void;
};

const SetsForm: React.FC<FormProps> = (props) => {
  const { path, onSubmit } = props;

  const [formDefinition, setFormDefinition] = useState<any>({});
  const formQuery = useFormFetch({ path: path });

  useEffect(() => {
    setFormDefinition(formQuery.data);
  }, [formQuery]);

  if (formQuery.status === 'success') {
    return (
      <div className="tw-px-5">
        {/* <Form form={formDefinition} onSubmit={onSubmit} /> */}
      </div>
    );
  }

  if (formQuery.status === 'error') {
    return <>Show Error widget</>;
  }

  return <>Loading</>;
};

export default SetsForm;
