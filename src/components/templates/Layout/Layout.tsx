import { MenuTypes } from 'src/components/organisms/Menu/Menu';
import { fbEvent } from '@rivercode/facebook-conversion-api-nextjs';
import { useEffect } from 'react';

import Menu from 'src/components/organisms/Menu/Menu';
import Footer from 'src/components/organisms/Footer/Footer';
import ButtonTop from 'src/components/organisms/ButtonTop/ButtonTop';
// import AgreeWidget from 'src/components/organisms/AgreeWidget/AgreeWidget';

const Layout = ({ children }: { children: JSX.Element[] | JSX.Element }) => {

  useEffect(() => {
    fbEvent({
      eventName: 'ViewContent', // ViewContent, AddToCart, InitiateCheckout, Purchase etc.
      enableStandardPixel: false // default false (Require Facebook Pixel to be loaded, see step 2)
    });
  }, []);

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
