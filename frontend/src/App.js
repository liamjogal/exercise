import * as React from "react";
import Profile from "./components/user_info/Profile";
import History from "./components/exercise_data/pages/History";
import Edit from "./components/user_info/Edit";
import Friends from "./components/exercise_data/pages/Friends";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import NoPage from "./components/exercise_data/pages/NoPage";

// export var AccountContext = React.createContext({
//   username: "",
//   password: "",
//   privacy: "",
//   valid: false,
//   exercises: {},
//   profile: {
//     user: "",
//     followers: [],
//     following: [],
//     privacy: false,
//     bio: "",
//     exercise_type: "",
//     exercises: [],
//     posts: [],
//   },
// });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login id="login" />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<History id="history" />} />
          <Route index={false} path="friends" element={<Friends />} />
          <Route index={false} path="account" element={<Profile />} />
          <Route index={false} path="edit" element={<Edit id="edit"></Edit>} />
          <Route index={false} path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
