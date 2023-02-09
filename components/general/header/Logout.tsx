import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Logout = () => {
  const router = useRouter();
  return (
    <Link href="#">
      <button
        onClick={async () => {
          await signOut();
          router.push('/auth/login');
        }}
      >
        <div className="flex mt-1 bg-gradient-top-bottom h-10 w-36 rounded-lg">
          <div className="m-auto flex">
            <div>
              <img className="h-6" src="/logout-icon.png" />
            </div>
            <div className="font-semibold font-play text-white ml-1">LOG OUT</div>
          </div>
        </div>
      </button>
    </Link>
  );
};
export default Logout;
