import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className="wrapper">
      <Nav />
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
