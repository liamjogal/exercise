import * as React from "react";
import Nav from "./exercise_data/components/Nav";
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
