import React from 'react';
interface Props {
  /* eslint-disable @typescript-eslint/no-explicit-any*/
  children: any;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-rows-1 grid-cols-2 multiple-bg min-h-screen">
      {children}
    </div>
  );
};

export default AuthLayout;
