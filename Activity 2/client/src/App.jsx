import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//PAGES
import SignupPage from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import ForgotPassword from "./pages/forgotPassword.jsx";


const App = () => {
  return (
   <>
   
   
        <SignupPage/>
   

   </>
  );
};

export default App;