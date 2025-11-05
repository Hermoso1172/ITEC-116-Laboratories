import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./pages/layout";
import Firstpage from "./pages/firstpage";
import Trashpage from "./pages/trashpage";
import Login from "./pages/login";
import Editpage from "./pages/editpage";
import Folderpage from "./pages/folderpage";
import NewNote from "./pages/newNotes";
import SignupPage from "./pages/signup";
import ForgotPassword from "./pages/forgotPassword";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute"; // adjust path
import Folder from "./pages/folder";

const App = () => {
  const { currentUser } = useAuth();
  return (
    <Router>
      <Routes>
        {/* Redirect logged-in users away from login/signup */}
        {/* Protected routes */}
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/insideWeb" replace /> : <Login />
          }
        />
        <Route
          path="/signup"
          element={
            currentUser ? <Navigate to="/insideWeb" replace /> : <SignupPage />
          }
        />
        <Route path="forgot" element={<ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path="insideWeb" element={<Layout />}>
            <Route index element={<Firstpage />} />
            <Route path="folder">
              <Route index element={<Folderpage />} />
              <Route path=":id" element={<Folder />} />
            </Route>
            <Route path="trash" element={<Trashpage />} />
            <Route path="newNote/:folderId?" element={<NewNote />} />
            <Route path="edit/:id" element={<Editpage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
