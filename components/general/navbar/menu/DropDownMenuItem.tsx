import React, { Fragment } from 'react';
// import MenuItem from './MenuItem';
import { MenuType } from 'interfaces/Menus';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface Props {
  item: MenuType;
  subMenu?: boolean;
}

const DropDownMenuItem: React.FC<Props> = (props) => {
  const { item, subMenu } = props;
  const subMenuList = item.subMenus;

  return (
    <>
      <div className="group">
        <button className="outline-none text-white w-full hover:bg-blue-900 text-sm font-play focus:outline-none px-4 py-3 text-left flex items-center">
          <span className="pr-1 flex-1">{item.Title}</span>
          <ChevronDownIcon className="w-5 h-5 ml-2 -mr-1 text-white"
              aria-hidden="true"/>
        </button>
        <ul
          className="bg-white w-56 pl-0 transform scale-0 group-hover:scale-100 absolute 
  transition duration-150 ease-in-out origin-top min-w-32"
        >
          <li className="w-full hover:bg-gray-100 justify-start text-sm font-medium">
              {subMenuList?.map(
                (menuItem: MenuType, i: React.Key | undefined | null) => {
                  if (
                    menuItem.subMenus != null &&
                    menuItem.subMenus.length > 0
                  ) {
                    return (
                      <>
                        <li
                          key={i}
                          className="w-full pr-3 hover:bg-blue-900 hover:text-white text-blue-900 relative justify-start text-sm font-medium"
                        >
                          <button className="w-full text-sm font-play text-left flex outline-none focus:outline-none hover:bg-blue-900">
                            <span className="px-4 py-3 pr-1 w-full flex-1">
                              {menuItem.Title}
                            </span>
                            <span className="mr-auto pt-3">
                              <svg
                                className="fill-black h-4 w-4 transition duration-150 ease-in-out"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </span>
                          </button>
                          <ul
                            className="w-56 pl-0 bg-white absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left min-w-32">
                            <li className="px-4 py-3 w-full hover:bg-gray-100 justify-start text-sm font-medium">
                              {menuItem.subMenus?.map(
                                (
                                   s
                                ) => {
                                    return(
                                      <>
                                      <li className="font-play hover:bg-blue-900 hover:text-white w-full inline-flex justify-start text-sm font-medium" >
                                    <Link href={s.UrlPath}>
                                      <button
                                        className={`hover:text-white text-blue-900 group flex py-3 px-4 w-full text-sm `}
                                      >
                                        {s.Title}
                                      </button>
                                    </Link>
                                  </li>
                                      </>
                                    )
                                  }
                                  
                              )}
                            </li>
                          </ul>
                        </li>
                      </>
                    );
                  } else {
                    return (
                      <li key={i}>
                        <Link href={menuItem.UrlPath}>
                          <button
                            className={`text-blue-900 group flex items-center py-3 px-4 w-full text-sm hover:bg-blue-900 hover:text-white`}
                          >
                            {menuItem.Title}
                          </button>
                        </Link>
                      </li>
                    );
                  }
                }
              )}
          </li>
        </ul>
      </div>
    </>
  );
};
export default DropDownMenuItem;
