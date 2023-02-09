import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const User = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex mt-5">
      <div className="ml-5">
        <Image src="/user-icon.png" width="50" height="50" />
      </div>
      <div className="ml-5">
        <div className="font-bold text-left text-l text-gray-200">
          {
            
            session?.user?.userDTO?.username
          }
        </div>
        <div className="text-left text-gray-400">
          {
            
            session?.user?.userDTO?.role?.role
          }
        </div>
      </div>
    </div>
  );
};
export default User;
