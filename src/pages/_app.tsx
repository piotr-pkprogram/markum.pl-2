import type { AppProps } from 'next/app';
import '../styles/globals.scss';
// @ts-ignore
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';
// @ts-ignore
import { FBPixelScript, FBPixelProvider } from '@rivercode/facebook-conversion-api-nextjs/components';
import Layout from '../components/templates/Layout/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <CookiesProvider>
        <FBPixelScript />
        <FBPixelProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FBPixelProvider>
      </CookiesProvider>
    </>
  );
};

export default MyApp;
