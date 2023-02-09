import React, { Fragment, useContext, useState } from 'react';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { LocaleContext } from 'contexts/i18n';

const LanguageSwitcher = () => {
  const obj = {
    en: 'English',
    mk: 'Macedonian',
  };
  const { locale, switchLanguage } = useContext(LocaleContext);
  console.log(locale);
  const [ln, setLn] = useState(obj[locale ? locale : 'en']);

  const onSwitchLanguage = (lang: 'en' | 'mk') => {
    localStorage.setItem('lang', lang);
    switchLanguage(lang);
    setLn(obj[lang]);
  };

  return (
    <Menu as="div" className="relative inline-block text-left mt-1">
      <div>
        <Menu.Button className="inline-flex flex-row items-center justify-center w-full px-4 py-2 text-sm uppercase font-play font-bold text-blue-800">
          <span className="ml-2">{ln}</span>
          <ChevronDownIcon
            className="w-5 h-5 ml-2 -mr-1 text-white hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-6 mt-2 z-50 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-4 w-48">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-base hover:text-gray-900 hover:bg-gray-100`}
                  onClick={() => onSwitchLanguage('en')}
                >
                  English
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-violet-500 text-white' : 'text-gray-900'
                  } group flex rounded-md items-center w-full px-2 py-2 text-base hover:text-gray-900 hover:bg-gray-100`}
                  onClick={() => onSwitchLanguage('mk')}
                >
                  Macedonian
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LanguageSwitcher;
