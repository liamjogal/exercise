import logo from "./logo.svg";
import "./App.css";
import Main from "./components/exercise_data/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import * as react from "react";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
