import logo from "./logo.svg";
//import "./App.css";
import Main from "./components/exercise_data/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import * as React from "react";
import AccountContext from "./context/AccountContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login id="login" />} />
          <Route path="/home" element={<Main id="main" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
