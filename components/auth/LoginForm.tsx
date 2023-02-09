import React, { useState, useEffect } from 'react';
// import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classnames from 'classnames';
import { Formik, Form } from 'formik';
//import { LoginSchema } from '../../schemas/AuthSchemas';
// import { AxiosResponse } from 'axios';
import { signIn } from 'next-auth/react';
import { Login } from 'interfaces/Users';
import { ENV } from '../../env';

type Props = {
  showOptions?: boolean;
};
const LoginForm = ({ showOptions }: Props) => {
  const [username, setUsername] = useState('');
  const [isLoginStarted, setIsLoginStarted] = useState(false);
  const [loginError, setLoginError] = useState('');
  // const [accountData, setAccountData] = useState();
  // const [loginResponse, setLoginResponse] = useState<AxiosResponse | any>(null);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('emailSent');
    if (router.query.error) {
      setLoginError(router.query.error as string);
      setUsername(router.query.email as string);
    }
  }, [router]);

  const handleOnSubmit = async (values: Login) => {
    setIsLoginStarted(true);
    const { username, password } = values;
    signIn('credentials', {
      username,
      password,
      callbackUrl: ENV.NEXT_PUBLIC_API_ENDPOINT,
    });
  };

  return (
    <Formik
      initialValues={{
        username: username,
        password: '',
      }}
      onSubmit={handleOnSubmit}
      // validationSchema={LoginSchema}
    >
      {/* eslint-disable @typescript-eslint/no-unused-vars */}
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form className="flex flex-col w-full ">
          {loginError && (
            <span className="rounded-md p-3 bg-red-500 text-gray-50 text-center mb-5">
              Invalid login attempt. Try again.
            </span>
          )}
          {!showOptions && (
            <div className="">
              <div className="mb-4 w-full">
                <label
                  htmlFor="username"
                  className="flex w-full mb-2 text-xl md:text-base sm:text-sm"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  placeholder="Please enter username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classnames(
                    'rounded border flex w-full py-2 px-3',
                    {
                      'border-gray-300': !errors.username && !touched.username,
                      'border-red-500': errors.username && touched.username,
                    }
                  )}
                />
                {errors.username && touched.username ? (
                  <small className="text-red-800 font-bold">
                    {errors.username}
                  </small>
                ) : null}
              </div>
              <div className="mb-5 block w-full">
                <label htmlFor="password" className="flex w-full mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  placeholder="Please enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={classnames(
                    'rounded border-gray-300 border flex w-full py-2 px-3',
                    {
                      'border-gray-300': !errors.password && !touched.password,
                      'border-red-500': errors.password && touched.password,
                    }
                  )}
                />
                {errors.password && touched.password ? (
                  <small className="text-red-800 font-bold">
                    {errors.password}
                  </small>
                ) : null}
              </div>
              <div className="flex w-full justify-between">
                <div>
                  <input
                    type="checkbox"
                    name="remember"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="rounded text-gray-900 border-gray-200 mr-1"
                  />
                  <label htmlFor="remember" className="font-bold md:text-sm">
                    Remember Me
                  </label>
                </div>
                <Link href="/">
                  <a className="underline font-bold md:text-sm md:font-bold">
                    Forgot my password
                  </a>
                </Link>
              </div>
              <div>
                <button
                  className={classnames(
                    'mt-4 hover:scale-110 w-full bg-blue-900 text-white h-12 rounded-md font-semibold'
                  )}
                  type="submit"
                  disabled={isLoginStarted}
                >
                  {isLoginStarted ? (
                    <div className="flex flex-row items-center justify-center">
                      <span className="mr-2"></span>
                      <span className="">Authenticating...</span>
                    </div>
                  ) : (
                    <span>Sign In</span>
                  )}
                </button>
              </div>
            </div>
          )}
          {showOptions && (
            <div>
              <button
                className={classnames()}
                type="submit"
                onClick={() => signIn()}
              >
                <span>Sign in with Basic-MFA</span>
              </button>
              <div>
                <span>OR</span>
              </div>
              <button disabled={true} className={classnames()} type="submit">
                <span className="ml-4">Sign in with Azure/ADO</span>
              </button>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
