import { DocumentSearchIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type SearchProps = {
  setBarcode: any;
  isLoading?: boolean;
  onSubmitBarcode: any;
  barcode: any;
};

const BarcodeSearchPackaging: React.FC<SearchProps> = (props) => {
  const { setBarcode, isLoading, barcode } = props;
  return (
    <div className="w-full flex flex-row space-x-3 justify-center items-end mt-4 shadow-md rounded-md px-4 py-6 border-blue-800 border-t-4">
      <div className="flex flex-col space-y-2 flex-grow">
        <label className="text-sm text-gray-600 font-bold">Barcode</label>
        <div className="relative">
          <input
            type="text"
            name="CIF"
            className={classnames(
              'w-full py-2 pl-3 pr-10 border border-gray-300 text-left text-sm rounded-md placeholder-gray-500 placeholder-opacity-70 mt-2 disabled:opacity-30',
              {
                // 'border-gray-300': !isCIFInvalid,
                // 'border-red-500': isCIFInvalid,
              }
            )}
            placeholder="Enter set barcode"
            onChange={(e) => setBarcode(e.target.value)}
            value={barcode}
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
        <Link
          href={{
            pathname: `/sets/sets-packaging/[setId]`,
            query: {
              setId: barcode,
            },
          }}
        >
          <a className="flex flex-row items-center px-4 py-2 rounded-md bg-blue-900 text-white text-sm font-bold ring ring-blue-800 hover:bg-blue-800 disabled:opacity-50 disabled:pointer-events-none">
            <span>Search</span>
            <DocumentSearchIcon className="w-5 h-5 ml-2" />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BarcodeSearchPackaging;
