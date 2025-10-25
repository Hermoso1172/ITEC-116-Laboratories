import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Firstpage from "./pages/firstpage";
import Trashpage from "./pages/trashpage";
import Login from "./pages/login"
import Editpage from "./pages/editpage";
import Folderpage from "./pages/folderpage";
import NewNote from "./pages/newNotes";
import SignupPage from "./pages/signup";
import ForgotPassword from "./pages/forgotPassword";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/* Shared layout */}
        <Route path="insideWeb" element={<Layout />}>
          <Route index element={<Firstpage />} />
          <Route path="folder" element={<Folderpage />} />
          <Route path="trash" element={<Trashpage />} />
          <Route path="newNote" element={<NewNote />} />
          <Route path="edit/:id" element={<Editpage />} />
        </Route>
        <Route path="signin" element={<SignupPage />}></Route>
        <Route path="forgot" element={<ForgotPassword />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
