import React from "react";
import Header from "../Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <footer>Footer</footer> */}
    </>
  );
};

export default Layout;
