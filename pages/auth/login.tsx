import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
//import AuthLayout from '../../components/auth/authLayout'
import LoginForm from 'components/auth/LoginForm';
import AuthLayout from 'components/auth/AuthLayout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
//import { AuthCarousel } from '../../components/auth/AuthWidgets'
import LanguageSwitcher from 'components/general/header/LanguageSwitcher';

import { useIntl } from 'react-intl';

type Props = {
  showOptions?: boolean;
};
const pageTitle = 'Welcome to Branch Service Hub | Login';

const Login = ({ showOptions }: Props) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const intl = useIntl();

  if (status === 'loading') {
    return <h1>'Loading...'</h1>;
  } else if (status === 'authenticated') {
    router.push('/');
  }
  return (
    <AuthLayout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="col-span-1 flex flex-1 flex-col items-stretch bg-blue-900 text-white p-8 font-play min-h-full">
        <div className="flex items-center justify-self-start">
          <p className="text-3xl font-bold ml-1 uppercase">
            {intl.formatMessage({
              defaultMessage: 'Welcome to Medical Instruments Management',
            })}
          </p>
        </div>

        <div className="justify-self-center my-auto flex flex-col justify-center">
          <Image
            src="/customer-profile.svg"
            width={200}
            height={200}
            alt="Customer Profile"
            className=""
          />
        </div>
      </div>
      <div className="col-span-1 flex flex-1 flex-col justify-center font-play h-full bg-gray-50">
        <LanguageSwitcher />
        <div className="flex flex-col justify-between items-center justify-self-center my-auto ">
          <div className="flex flex-col justify-self-center items-center shadow-md px-9 bg-white py-12 mx-auto rounded w-2/4 lg:w-2/4 md:w-4/5 xl:w-3/5 mt-auto">
            <h4 className="font-bold text-2xl mb-6 md:mb-2 md:text-xl sm:text-sm">
              {intl.formatMessage({
                defaultMessage: 'Login with your credentials',
              })}
            </h4>
            <p className="text-base md:text-base sm:text-sm"></p>
            <LoginForm showOptions={showOptions} />
          </div>
        </div>
        {/* <Footer /> */}
        <div className="justify-self-end items-center flex flex-col font-bold py-8">
          &copy; 2021 • Powered by PCES
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
