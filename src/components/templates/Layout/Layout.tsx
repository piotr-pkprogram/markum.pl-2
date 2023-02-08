import React from 'react';
import { MenuTypes } from 'src/components/organisms/Menu/Menu';
// @ts-ignore
import loadable from '@loadable/component';

const Menu = loadable(() => import('src/components/organisms/Menu/Menu'));
const Footer = loadable(() => import('src/components/organisms/Footer/Footer'));
const ButtonTop = loadable(() => import('src/components/organisms/ButtonTop/ButtonTop'));
const AgreeWidget = loadable(() => import('src/components/organisms/AgreeWidget/AgreeWidget'));

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

  return (
    <>
      <div>
        <Menu />
        <Menu type={MenuTypes.phone} />
        <main className="mt-16 normal:mt-0">{children}</main>
        <Footer />
      </div>
      <ButtonTop />
      <AgreeWidget />
    </>
  );
};

export default Layout;
