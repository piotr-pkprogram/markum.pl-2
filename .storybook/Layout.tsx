import React from 'react';
import 'styles/globals.scss';

// @ts-ignore
const Layout = ({ children }) => {
  return (
      <div className="px-20 py-10 relative">{children}</div>
  );
};

export default Layout;
