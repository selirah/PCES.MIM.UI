import { Transition } from '@headlessui/react';
import React from 'react';
import LanguagePicker from './header/LanguagePicker';
import LanguageSwitcher from './header/LanguageSwitcher';
import Logout from './header/Logout';
import Logo from './navbar/Logo';

interface Props {
  setShow: any;
  show: boolean;
}

const Header: React.FC<Props> = ({ setShow, show }: Props) => {
  return (
    <div className="w-full general-background flex border-b-4 border-blue-navy justify-end">
      <div className="flex justify-between w-full">
        <div>{show ? <Logo /> : null}</div>
        <div className="flex">
          <div>
            <button
              className={`text-5xl mr-10 mt-2 text-center font-play rounded-md pb-1 px-4 mb-2 ${
                show ? 'text-gradient' : ' bg-gradient-top-bottom text-gray-300'
              }`}
              onClick={() => setShow(!show)}
            >
              {show ? '>' : '<'}
            </button>
          </div>
          <div className="mr-10 mt-auto ml-auto mb-auto">
            <Logout />
          </div>
          <div className="mr-10 mt-auto ml-auto mb-auto">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
