import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import App from "./App";
import Login from "./components/Login";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: Login,
//   },
// ]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
