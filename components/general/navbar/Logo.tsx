import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <a className="no-underline">
        <div className="flex mt-5">
          <div className="ml-5">
            <div className="font-bold text-left text-2xl font-play text-gray-200">Trace Model</div>
            <div className="text-xs text-left text-gray-400">DASHBOARD</div>
          </div>
        </div>
      </a>
    </Link>
  );
};
export default Logo;
