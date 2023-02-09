import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex mt-5">
      <div className="ml-5">
        <Image src="/craft-icon.png" width="50" height="50" />
      </div>
      <div className="ml-5">
        <div className="font-bold text-left text-2xl text-gray-900">MIM</div>
        <div className="text-xs text-left text-gray-900">
          MEDICAL INSTRUMENTS MANAGEMENT
        </div>
      </div>
    </div>
  );
};
export default Logo;
