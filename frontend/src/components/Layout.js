import * as React from "react";
import Nav from "./exercisefeatures/components/Nav";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
};
export default Layout;
