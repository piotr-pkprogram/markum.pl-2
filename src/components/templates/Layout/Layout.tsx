import React from 'react';
import { MenuTypes } from 'src/components/organisms/Menu/Menu';

import Menu from 'src/components/organisms/Menu/Menu';
import Footer from 'src/components/organisms/Footer/Footer';
import ButtonTop from 'src/components/organisms/ButtonTop/ButtonTop';
// import AgreeWidget from 'src/components/organisms/AgreeWidget/AgreeWidget';

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
      {/* <AgreeWidget /> */}
    </>
  );
};

export default Layout;
