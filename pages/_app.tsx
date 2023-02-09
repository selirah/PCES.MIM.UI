import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import '../styles/globals.css';
import '../styles/custom.css';
import AppLayout from 'components/AppLayout';
import { LocaleContextProvider } from 'contexts/i18n';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <LocaleContextProvider>
          <AppLayout>
            {/*  you can wrap other components such as redux provider / context provider around this */}
            <Component {...pageProps} />
          </AppLayout>
        </LocaleContextProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
