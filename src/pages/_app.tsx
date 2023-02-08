import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store';
import '../styles/globals.scss';
// @ts-ignore
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';
// @ts-ignore
import loadable from '@loadable/component';

const Layout = loadable(() => import('../components/templates/Layout/Layout'));

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      </Head>
      <CookiesProvider>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </CookiesProvider>
    </>
  );
};

export default MyApp;
