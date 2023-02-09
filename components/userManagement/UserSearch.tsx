import { DocumentSearchIcon } from '@heroicons/react/outline';
import classnames from 'classnames';
import Image from 'next/image';
import React from 'react';

type SearchProps = {
  getUser: any;
  isLoading?: boolean;
  onSubmitUser: any;
};

const UserSearch: React.FC<SearchProps> = (props) => {
  const { getUser, isLoading, onSubmitUser } = props;
  return (
    <div className="w-full flex flex-row space-x-3 justify-center items-end mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4">
      <div className="flex flex-col space-y-2 flex-grow">
        <label className="text-sm text-gray-600 font-bold">User Search</label>
        <div className="">
          <input
            type="text"
            name="CIF"
            className={classnames(
              'w-full flex flex-row py-2 pl-3 pr-10 border border-gray-300 text-left text-sm rounded-md placeholder-gray-500 placeholder-opacity-70 mt-2 disabled:opacity-30 ',
              {
                // 'border-gray-300': !isCIFInvalid,
                // 'border-red-500': isCIFInvalid,
              }
            )}
            placeholder="Enter Username"
            onChange={(e) => getUser(e.target.value)}
            // disabled={isLoading}
          />
          {isLoading && (
            <div className="absolute right-0 bottom-1 mt-4 mr-4">
              <Image
                width={16}
                height={16}
                src="/waiting-2.svg"
                className="animate-spin"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-1/6">
        <button
          className="flex flex-row items-center px-4 py-2 rounded-md bg-blue-900 text-white text-sm font-bold ring ring-blue-800 hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none"
          onClick={onSubmitUser}
          // disabled={isLoading}
        >
          <span>Search</span>
          <DocumentSearchIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default UserSearch;
