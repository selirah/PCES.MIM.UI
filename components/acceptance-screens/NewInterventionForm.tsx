/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { CogIcon } from '@heroicons/react/outline';
import { useFormFetch } from 'middleware/formio';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';

const Form = dynamic(() => import('@formio/react').then((mod) => mod.Form), {
  ssr: false,
});

type FormProps = {
  path: string;
  onSubmit: (data: any) => void;
  submission?: any;
};

const NewInterventionForm: React.FC<FormProps> = (props) => {
  const { path, onSubmit, submission } = props;
  const [formDefinition, setFormDefinition] = useState<any>({});
  const [formSubmission, setFormSubmission] = useState<any>({});
  const formQuery = useFormFetch({ path: path });

  useEffect(() => {
    console.log(navigator.platform);
    if (navigator) {
      setFormDefinition(formQuery.data);
    }
  }, [formQuery]);

  useEffect(() => {
    // console.log(submission)
    if (navigator) {
      setFormSubmission(submission || {});
    }
  }, [submission]);

  if (formQuery.status === 'success') {
    return (
      <div className="w-full flex flex-col mt-2 px-4">
        {/* <Form form={formDefinition} onSubmit={onSubmit} submission={formSubmission} /> */}
      </div>
    );
  }

  if (formQuery.status === 'error') {
    return <>Error getting form</>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-auto mx-auto">
      <CogIcon className="w-40 h-40 animate-spin" />
    </div>
  );
};

export default NewInterventionForm;
