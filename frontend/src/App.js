import logo from "./logo.svg";
import "./App.css";
import Main from "./components/exercise_data/Main";
import Login from "./components/Login";
import * as react from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Login></Login>
      {/* <Main></Main> */}
    </div>
  );
}

export default App;
