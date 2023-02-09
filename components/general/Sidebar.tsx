import React, { useState } from 'react';
import Slogan from './footer/Slogan';
import Logo from './navbar/Logo';
import MenuList from './navbar/Menu';
import User from './navbar/User';

interface Props {
  show: boolean;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const { show } = props;
  return (
    <div className={`bg-gradient-top-bottom rounded-r-sm text-blue-100 absolute left-0 top-0 bottom-0 min-h-full z-50 w-1/5 ${show ? 'hidden' : null} border-r-8 border-blue-navy`}>
      <Logo />
      <div className="border-b-2 border-blue-300 pb-4">
        <User />
      </div>
      <MenuList />
      <Slogan />
    </div>
  );
};

export default Sidebar;
