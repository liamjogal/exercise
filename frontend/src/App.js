import * as React from "react";
import Profile from "./components/user_info/Profile";
import History from "./components/exercisefeatures/pages/History";
import Edit from "./components/user_info/Edit";
import Friends from "./components/exercisefeatures/pages/Friends";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import NoPage from "./components/exercisefeatures/pages/NoPage";
import Chat from "./components/exercisefeatures/pages/Chat";

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
        <Route path="" element={<Login id="login" />} />
        <Route path="home" element={<Layout />}>
          <Route index element={<History id="history" />} />
          <Route index={false} path="friends" element={<Friends />} />
          <Route index={false} path="account" element={<Profile />} />
          <Route index={false} path="chat" element={<Chat />} />
          <Route index={false} path="edit" element={<Edit id="edit"></Edit>} />
          <Route index={false} path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
