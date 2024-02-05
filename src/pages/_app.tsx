import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.scss';
// @ts-ignore
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';
import { FBPixelScript, FBPixelProvider } from '@rivercode/facebook-conversion-api-nextjs/components';
import { fbEvent } from '@rivercode/facebook-conversion-api-nextjs';
import { useEffect } from 'react';

const Layout = loadable(() => import('../components/templates/Layout/Layout'));

const MyApp = ({ Component, pageProps }: AppProps) => {

  useEffect(() => {
    fbEvent({
      eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout, Purchase etc.
      enableStandardPixel: false // default false (Require Facebook Pixel to be loaded, see step 2)
    });
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <CookiesProvider>
        <FBPixelScript />
        <FBPixelProvider>
          <Provider store={store}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </FBPixelProvider>
      </CookiesProvider>
    </>
  );
};

export default MyApp;
