import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
//@ts-ignore
const Form = dynamic(() => import('@formio/react').then((mod) => mod.Form), {
  ssr: false,
});

import { useFormFetch } from 'middleware/formio';
import styles from './index.module.css';

type FormIOProps = {
  path: string;
  onSubmit: (data: any) => void;
};

const FormIOExample: React.FC<FormIOProps> = ({ path, onSubmit }) => {
  const [, setFormDefinition] = useState<any>({});
  const formQuery = useFormFetch({ path: path });

  useEffect(() => {
    setFormDefinition(formQuery.data);
  }, [formQuery]);

  if (formQuery.status === 'success') {
    return (
      <div className={styles.formContainer}>
        {/*<Form form={formDefinition} onSubmit={onSubmit} />*/}
      </div>
    );
  }

  if (formQuery.status === 'error') {
    return <>There was an error fetch the form</>;
  }

  return <>Loading ...</>;
};

export default FormIOExample;
