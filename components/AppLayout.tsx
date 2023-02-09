import { useSession } from 'next-auth/react';
import React, { CSSProperties, useState } from 'react';
import Sidebar from './general/Sidebar';
import Wrapper from './general/Wrapper';
import { BounceLoader } from 'react-spinners';
import { useRouter } from 'next/router';

interface Props {
  children: any;
}


const AppLayout: React.FC<Props> = ({ children }: Props) => {
  const [show, setShow] = useState(false);
  const { data: session, status } = useSession();
  if (status !== 'authenticated') {
    return children;
  }
  return (
    <div className="flex h-full" id="wrapper-container">
      <Sidebar show={show} />
      <Wrapper setShow={setShow} show={show} children={children} />
    </div>
  );
};

export default AppLayout;
