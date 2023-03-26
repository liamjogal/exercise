import * as React from "react";
import Nav from "./exercise_data/components/Nav";
import { Outlet, useLocation } from "react-router-dom";
import { AccountContext } from "../context/AccountContext";

const Layout = () => {
  console.log(AccountContext);
  const [context, setContext] = React.useState(AccountContext);
  console.log(context);
  return (
    <AccountContext.Provider value={(context, setContext)}>
      <Nav />
      <Outlet />
    </AccountContext.Provider>
  );
};
export default Layout;
